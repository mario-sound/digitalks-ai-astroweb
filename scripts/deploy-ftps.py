"""Explicit FTPS, certificate verification, no remote deletion, assets before HTML.
Disabled unless repository variables and environment secrets are explicitly configured.
Never logs credentials or directory/account information. No FTP plaintext fallback.
"""
import ftplib
import json
import os
from pathlib import Path, PurePosixPath
import ssl


def validate():
    keys = ('HOSTINGER_FTP_HOST', 'HOSTINGER_FTP_USER', 'HOSTINGER_FTP_PASSWORD', 'HOSTINGER_FTP_DIR')
    if any(not os.environ.get(k) for k in keys):
        raise SystemExit('Missing Hostinger environment secrets; deployment refused.')
    target = os.environ.get('HOSTINGER_DEPLOY_TARGET', 'staging')
    remote = PurePosixPath(os.environ['HOSTINGER_FTP_DIR'])
    if '..' in remote.parts or str(remote) in ('/', '.', '/public_html', 'public_html') and target != 'production':
        raise SystemExit('Staging directory must be isolated from production.')
    if target not in ('staging', 'production'):
        raise SystemExit('Unknown deployment target.')
    if target == 'production':
        if os.environ.get('HOSTINGER_PRODUCTION_AUTHORIZED') != 'true':
            raise SystemExit('Explicit production authorization is missing.')
        if json.loads(Path('content/settings/general.json').read_text())['preview']:
            raise SystemExit('Production preview/indexing setting has not been reviewed.')
    if not Path('dist/index.html').is_file():
        raise SystemExit('Verified static artifact is missing.')
    return remote


def main():
    remote = validate()
    with ftplib.FTP_TLS(context=ssl.create_default_context(), timeout=60) as ftp:
        ftp.connect(os.environ['HOSTINGER_FTP_HOST'], 21)
        ftp.login(os.environ['HOSTINGER_FTP_USER'], os.environ['HOSTINGER_FTP_PASSWORD'])
        ftp.prot_p()
        # Existing explicit target directory only: never infer the production root.
        ftp.cwd(str(remote))
        root = ftp.pwd()
        files = sorted((p for p in Path('dist').rglob('*') if p.is_file()), key=lambda p: (p.suffix == '.html', str(p)))
        for local in files:
            relative = local.relative_to('dist')
            ftp.cwd(root)
            for part in relative.parts[:-1]:
                try:
                    ftp.cwd(part)
                except ftplib.error_perm:
                    ftp.mkd(part)
                    ftp.cwd(part)
            temporary = relative.name + '.uploading'
            with local.open('rb') as stream:
                ftp.storbinary('STOR ' + temporary, stream)
            ftp.rename(temporary, relative.name)
        print(f'Uploaded {len(files)} verified files. No remote files were deleted.')


if __name__ == '__main__':
    main()
