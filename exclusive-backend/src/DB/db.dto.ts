import { Model, UpdateQuery,QueryFilter, QueryOptions, PopulateOptions } from "mongoose";

export interface FindParams<TDoc> {
    filter?: QueryFilter<TDoc>
    model: Model<TDoc>
    options?: {
        populate?: PopulateOptions | PopulateOptions[]
        skip?: number
        limit?: number
        select?: string
    }
}

export interface FindByIdParams<TDoc> {
    model: Model<TDoc>
    id: string
    populate?: PopulateOptions | PopulateOptions[]
    select?: string
}

export interface FindOneAndUpdateParams<TDoc> {
    model: Model<TDoc>
    filter?: QueryFilter<TDoc>
    update: UpdateQuery<TDoc>
    options?: QueryOptions<TDoc>
    select?: string
}

export interface DeleteParams<TDoc> {
    model: Model<TDoc>
    filter: QueryFilter<TDoc>
}