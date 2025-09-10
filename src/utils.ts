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

const SAFE_URL_REGEX = /^[A-Za-z0-9-._~:/?&=%#]+$/;

/**
 * Validates a redirect URL to ensure it is safe for use in the ShareWorker.
 *
 * Rules:
 * - Must only contain safe URL characters (A-Z, a-z, 0-9, -._~:/?&=%#)
 * - Must be a valid URL parseable by `new URL()`
 * - Must use HTTPS (`https:`)
 * - Hostname must be in the allowed list (or a subdomain of an allowed host)
 *
 * @param {string} raw - The URL string to validate.
 * @returns {boolean} True if the URL is safe and allowed, false otherwise.
 */
export function isValidRedirect(raw: string): boolean {
    try {
        const link = raw.trim();

        // Check for only safe URL characters
        if (!SAFE_URL_REGEX.test(link)) return false;

        const url = new URL(link);

        // Only allow https
        if (url.protocol !== "https:") return false;

        // Check hostname whitelist (including subdomains)
        const hostname = url.hostname.toLowerCase();
        return ALLOWED_LINK_HOSTS.some(
            (allowed) =>
                hostname === allowed || hostname.endsWith("." + allowed)
        );
    } catch {
        return false;
    }
}
