import {Injectable} from '@nestjs/common';
import React from 'react';
@Injectable()
export class AppService {
    public Html({materialCss, state, app, linkTags, scriptTags, styleTags}): any {
        const bkup = `
        <script window.__APOLLO_STATE__=${JSON.stringify(state).replace(
            '<div id="root"></div>',
            `<div id="root">${app}</div>`,
        )} />
        `;
        return `
            <!doctype html>
            <html lang='eng'>
                <head>
                    <style id='jss-server-side'>${materialCss}</style>
                    ${styleTags}
                    ${linkTags}
                    <link
                        rel='stylesheet'
                        href='https://fonts.googleapis.com/icon?family=Material+Icons'
                    />
                    <link
                        rel='stylesheet'
                        href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
                    />
                </head>
                <body>
                <noscript><style>body { visibility: visible; }</style></noscript>
                <div id="root">${app}</div>
                ${scriptTags}
                </body>
                <script
                    src='https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.js'
                    defer
                />
            </html>
            `;
    }
}
