import {defineMiddleware} from 'astro:middleware';
import redirects from '../content/settings/redirects.json';
export const onRequest=defineMiddleware((context,next)=>{
 const target=redirects[context.url.pathname as keyof typeof redirects];
 if(target)return context.redirect(target,301);
 return next();
});
