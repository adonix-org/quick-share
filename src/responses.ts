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

import {
    CacheControl,
    HtmlResponse,
    HttpHeader,
    Worker,
} from "@adonix.org/cloud-spark";
import { getErrorHtml, getHtml } from "./html";
import { encode } from "he";

class SafeHtml extends HtmlResponse {
    constructor(worker: Worker, html: string) {
        super(worker, html, CacheControl.DISABLE);
        this.headers.set(
            HttpHeader.CONTENT_SECURITY_POLICY,
            "default-src 'none'; script-src 'none'; img-src 'self'; style-src 'self';"
        );
    }
}

export class SuccessPage extends SafeHtml {
    constructor(worker: Worker, title: string, link: string) {
        const html = getHtml(encode(title), encode(link));
        super(worker, html);
    }
}

export class ErrorPage extends SafeHtml {
    constructor(worker: Worker) {
        const html = getErrorHtml();
        super(worker, html);
    }
}
