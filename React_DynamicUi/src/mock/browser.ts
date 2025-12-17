import {setupWorker} from 'msw/browser';
import {addReview, passthroughImage, reviewForMain, reviewsById} from "./review"
import { bestBooks } from './books';
import { banners } from './banner';

const handlers = [addReview,reviewsById,passthroughImage, reviewForMain, bestBooks, banners];

export const worker = setupWorker(...handlers);