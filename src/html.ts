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
  <link rel="icon" href="https://www.tybusby.com/img/favicon.ico" sizes="any">
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
