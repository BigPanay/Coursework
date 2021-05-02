import {Controller, Get, UseGuards, Render, Req, Res} from '@nestjs/common';
import {Request, Response} from 'express';
import {AppService} from './app.service';
import {renderToString} from 'react-dom/server';
import App from '../src/app';
import React from 'react';
import {StaticRouter, StaticRouterContext} from 'react-router-dom';
import * as path from 'path';
import {Log} from './common/utils/logging/Log';
import fs from 'fs';
import theme from '../shared/theme';
import {ServerStyleSheets, ThemeProvider} from '@material-ui/core/styles';
import {CssBaseline} from '@material-ui/core';
import {ApolloProvider, resetCaches} from '@apollo/client';
import {renderToStringWithData} from '@apollo/client/react/ssr';
import clientConfig from '../shared/apolloConfig';
import {ChunkExtractor, ChunkExtractorManager} from '@loadable/server';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('*')
  root(@Req() req: Request, @Res() res: Response) {
    let now = Date.now();
    const sheets = new ServerStyleSheets();
    //Loadable split files chunks (Optimisation)
    const stat: Buffer = fs.readFileSync(path.join(__dirname, 'static', 'loadable-stats.json'));
    const stats = JSON.parse(stat.toString());

    const statsFile = path.resolve(__dirname, 'static', 'loadable-stats.json');
    const extractor = new ChunkExtractor({stats});

    const context: StaticRouterContext = {};
    const modules = [];

    //Wrap the APP with Material-UI and Apollo
    const jsx = sheets.collect(
        <ChunkExtractorManager extractor={extractor}>
            <ApolloProvider client={clientConfig}>
                <StaticRouter location={req.url} context={context}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <App />
                    </ThemeProvider>
                </StaticRouter>
            </ApolloProvider>
        </ChunkExtractorManager>,
    );

    const css = sheets.toString();
    const scriptTags = extractor.getScriptTags(); // or extractor.getScriptElements();
    const styleTags = extractor.getStyleTags();
    const linkTags = extractor.getLinkTags();
    
    renderToStringWithData(jsx).then(content => {
      const initialState = clientConfig.extract();

      const app = renderToString(content)

      Log.server.debug(`${req.url} - ${Date.now() - now}ms`);
      res.status(200);
      res.send(
          this.appService.Html({
              app: content,
              linkTags: linkTags,
              styleTags: styleTags,
              scriptTags: scriptTags,
              materialCss: css,
              state: initialState,
          }),
      );
      res.end();
  });
  }
}
