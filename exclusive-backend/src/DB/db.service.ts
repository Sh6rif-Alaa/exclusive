import { Model, HydratedDocument, PipelineStage } from "mongoose";
import { DeleteParams, FindByIdParams, FindOneAndUpdateParams, FindParams } from "./db.dto";

export const create = async <TDoc>({ data, model }: { data: Partial<TDoc>, model: Model<TDoc> }): Promise<HydratedDocument<TDoc>> => {
    return await model.create(data)
}

export const aggregate = async <TDoc>({ pipeline = [], model }: { pipeline?: PipelineStage[], model: Model<TDoc> }) => {
    return await model.aggregate(pipeline)
}

export const find = async <TDoc>({ filter = {}, model, options = {} }: FindParams<TDoc>) => {
    const doc = model.find(filter)
    if (options.populate) doc.populate(options.populate)
    if (options.skip) doc.skip(options.skip)
    if (options.limit) doc.limit(options.limit)
    if (options.select) doc.select(options.select)
    return await doc.exec()
}

export const findOne = async <TDoc>({ filter = {}, model, options = {} }: FindParams<TDoc>) => {
    const doc = model.findOne(filter)
    if (options.populate) doc.populate(options.populate)
    if (options.skip) doc.skip(options.skip)
    if (options.limit) doc.limit(options.limit)
    if (options.select) doc.select(options.select)
    return await doc.exec()
}

export const findById = async <TDoc>({ model, id, populate = [], select = "" }: FindByIdParams<TDoc>) => {
    return await model.findById(id).populate(populate).select(select)
}

export const findOneAndUpdate = async <TDoc>({ model, filter = {}, update, options = {}, select = "" }: FindOneAndUpdateParams<TDoc>) => {
    return await model.findOneAndUpdate(filter, update, { ...options, new: true }).select(select)
}

export const deleteOne = async <TDoc>({ model, filter }: DeleteParams<TDoc>) => {
    return await model.deleteOne(filter)
}

export const deleteMany = async <TDoc>({ model, filter }: DeleteParams<TDoc>) => {
    return await model.deleteMany(filter)
}