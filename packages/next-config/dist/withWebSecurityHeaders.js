export function withWebSecurityHeaders(config) {
    const originalHeaders = config.headers || [];
    // eslint-disable-next-line no-param-reassign
    config.headers = async () => {
        const headers = [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    // createCSP(),
                ],
            },
        ];
        if (typeof originalHeaders !== 'function') {
            return [...headers, ...originalHeaders];
        }
        const customHeaders = await originalHeaders();
        return [...headers, ...customHeaders];
    };
    return config;
}
