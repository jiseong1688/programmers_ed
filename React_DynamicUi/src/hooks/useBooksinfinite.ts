import { useLocation } from "react-router-dom"
import { LIMIT } from "../constants/pagination";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBooks, FetchBooksResponse } from "../api/books.api";
import { QUERYSTRING } from "../constants/querystring";

export const useBooksInfinite = () =>{
    const location = useLocation();
    const params = new URLSearchParams(location.search)

    const getBooks = async ({ pageParam = 1 }): Promise<FetchBooksResponse> => {
        const category_id = params.get(QUERYSTRING.CATEGORY_ID)
            ? Number(params.get(QUERYSTRING.CATEGORY_ID))
            : undefined
        const news = params.get(QUERYSTRING.NEWS) ? true : undefined
    
        return fetchBooks({
            category_id,
            news,
            limit: LIMIT,
            currentPage: pageParam,
        })
    }

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        } = useInfiniteQuery({
            queryKey: ["books", location.search],
            queryFn: getBooks,
            initialPageParam: 1,
            getNextPageParam: (lastPage) => {
                const isLastPage = Math.ceil(lastPage.pagination.totalCount/LIMIT)===lastPage.pagination.currentPage;
                return isLastPage ? null : lastPage.pagination.currentPage + 1;
            },
        })
    

    const books = data? data.pages.flatMap((page)=>page.books): [];
    const pagination = data ? data.pages[data.pages.length -1].pagination: {};
    const isEmpty = books.length ===0;

    return {
        books,
        pagination,
        isEmpty,
        isBooksLoading: isFetching,
        fetchNextPage,
        hasNextPage,
    }
}