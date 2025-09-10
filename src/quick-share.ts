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

import { BasicWorker, GET, Method } from "@adonix.org/cloud-spark";
import { ErrorPage, SuccessPage } from "./responses";
import { isValidRedirect } from "./utils";

export class QuickShare extends BasicWorker {
    public override getAllowedMethods(): Method[] {
        return [GET];
    }

    protected override async get(): Promise<Response> {
        const source = new URL(this.request.url);

        const target = source.searchParams.get("link");
        if (!target || !isValidRedirect(target)) {
            return this.getResponse(ErrorPage);
        }

        const title =
            source.searchParams.get("title")?.trim() || "Shared With You";

        // Success!
        return this.getResponse(SuccessPage, title, target);
    }
}
