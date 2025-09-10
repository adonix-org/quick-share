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

import { ALLOWED_LINK_HOSTS } from "./worker";

/**
 * Validates that a URL is safe for redirection.
 * - Must be a valid absolute URL
 * - Must use https
 * - Must match an allowed hostname
 */
export function isValidRedirect(urlStr: string): boolean {
    try {
        const url = new URL(urlStr);

        // Only allow https
        if (url.protocol !== "https:") return false;

        // Check hostname whitelist
        const hostname = url.hostname.toLowerCase().trim();
        return ALLOWED_LINK_HOSTS.some(
            (allowed) =>
                hostname === allowed || hostname.endsWith("." + allowed)
        );
    } catch {
        return false;
    }
}
