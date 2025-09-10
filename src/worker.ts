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

import { BasicWorker } from "@adonix.org/cloud-spark";
import { ErrorPage, SuccessPage } from "./responses";

const ALLOWED_LINK_HOSTS = ["localhost", "adonix.org", "tybusby.com"];

export class ShareWorker extends BasicWorker {
    protected override async get(): Promise<Response> {
        const source = new URL(this.request.url);

        const target = source.searchParams.get("link");
        if (!target) {
            return this.getResponse(ErrorPage);
        }

        const title =
            source.searchParams.get("title")?.trim() || "Shared With You";

        try {
            const link = new URL(target);

            // Is hostname allowed to be shared?
            const allowed = ALLOWED_LINK_HOSTS.some(
                (hostname) =>
                    link.hostname === hostname ||
                    link.hostname.endsWith("." + hostname)
            );
            if (!allowed) {
                return this.getResponse(ErrorPage);
            }

            // Success!
            return this.getResponse(SuccessPage, title, link.toString());
        } catch (err) {
            // Problem parsing the target link.
            console.error("Title:", title, "Target:", target, err);
            return this.getResponse(ErrorPage);
        }
    }
}
