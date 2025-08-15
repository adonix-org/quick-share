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
    ErrorResult,
    MimeType,
    StatusCodes,
    WorkerBase,
    WorkerResult,
} from "@adonix.org/cf-worker-base";
import { getHtml } from "./html";

const ALLOWED_LINK_HOSTS = ["localhost", "adonix.org", "tybusby.com"];

export class ShareWorker extends WorkerBase {
    protected override async get(request: Request): Promise<Response> {
        const url = new URL(request.url);

        const target = url.searchParams.get("link");
        if (!target) {
            return new ErrorResult(
                this,
                StatusCodes.BAD_REQUEST,
                "Missing link parameter"
            ).response;
        }

        let title = url.searchParams.get("title");
        if (!title || title.length === 0) {
            title = "Shared With You";
        }

        try {
            const link = new URL(target);
            const allowed = ALLOWED_LINK_HOSTS.some(
                (hostname) =>
                    link.hostname === hostname ||
                    link.hostname.endsWith("." + hostname)
            );

            if (!allowed) {
                return new ErrorResult(this, StatusCodes.FORBIDDEN).response;
            }

            // Success!
            return new WorkerResult(
                this,
                getHtml(title, link),
                StatusCodes.OK,
                MimeType.HTML
            ).response;
        } catch (err) {
            return new ErrorResult(this, StatusCodes.BAD_REQUEST, String(err))
                .response;
        }
    }
}
