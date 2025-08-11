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

import { getHtml } from "./html";
import { ContentType, STATUS, StatusCode } from "./http-constants";

const ALLOWED_LINK_HOSTS = ["localhost", "adonix.org", "tybusby.com"];

export default {
    async fetch(request, env, ctx): Promise<Response> {
        if (request.method === "OPTIONS") {
            // Handle preflight OPTIONS request
            return getResponse(STATUS.NO_CONTENT);
        }

        if (request.method !== "GET") {
            return getResponse(
                STATUS.METHOD_NOT_ALLOWED,
                getError("Method not allowed")
            );
        }

        // favicon.ico - return no content
        const url = new URL(request.url);
        if (url.pathname === "/favicon.ico") {
            return getResponse(STATUS.NO_CONTENT);
        }

        const target = url.searchParams.get("link");
        if (!target) {
            return getResponse(STATUS.BAD_REQUEST, "Missing link parameter");
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
                return getResponse(STATUS.FORBIDDEN, getError("Forbidden"));
            }

            return getResponse(STATUS.OK, getHtml(title, link), "text/html");
        } catch (err) {
            return getResponse(
                STATUS.BAD_REQUEST,
                getError(`Invalid link: ${target}`)
            );
        }
    },
} satisfies ExportedHandler<Env>;

function getResponse(
    status: StatusCode,
    body: string | null = null,
    contentType: ContentType = "application/json"
): Response {
    const headers = new Headers({
        "Cache-Control": "public, max-age=86400, immutable",
        "X-Content-Type-Options": "nosniff",
    });

    if (body) {
        const bodyBytes = new TextEncoder().encode(body);
        headers.set("Content-Type", contentType);
        headers.set("Content-Length", bodyBytes.length.toString());
    }

    return new Response(body, {
        status,
        headers: addCorsHeaders(headers),
    });
}

function addCorsHeaders(headers: Headers): Headers {
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    return headers;
}

function getError(message: string) {
    return JSON.stringify({ error: message });
}
