// src/features/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }), // Set base URL for API requests
    endpoints: (builder) => ({
        payMoney: builder.mutation({
            query: (amount) => ({
                url: '/pay_money',
                method: 'POST',
                body: { amt: amount },
            }),
        }),
    }),
});

export const { usePayMoneyMutation } = api;
