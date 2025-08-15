/*
 * Copyright (C) 2025 Ty Busby
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export function getHtml(title: string, link: URL): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <meta property="og:url" content="${link.toString()}"/>
  <meta property="og:title" content="${title}"/>
  <meta property="og:type" content="website"/>
  <meta property="og:locale" content="en_US"/>
  <meta property="og:description" content="OG Description."/>
  <meta property="og:image" content="/og-image.png"/>
  <meta property="og:image:type" content="image/png"/>
  <meta property="og:image:height" content="1200"/>
  <meta property="og:image:width" content="630"/>
  <meta property="og:image:alt" content="Share Image"/>
  <meta property="og:site_name" content="${title}"/>
  <meta http-equiv="refresh" content="0; URL='${link.toString()}'" />
</head>
<body>
  <p>
    <a href="${link.toString()}">${title}</a>
  </p>
    <script>
    window.location.href = "${link.toString()}";
  </script>
</body>
</html>`;
}
