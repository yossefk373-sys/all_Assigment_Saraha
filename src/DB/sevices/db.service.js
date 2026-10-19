

export const create=async({model,data,option={}}={})=>{
   return await model.create([data],option) 
}
export const findById=async({model,id,option={}}={})=>{
    return await model.findById(id,option)
}
export const findOne=async({model,filter,option={}}={})=>{
    return await model.findOne(filter,option)
}
export const find=async({model,filter,option={}}={})=>{
    return await model.find(filter,option)
}
export const findByIdAndUpdate = async ({ model, id, update, option = { new: true, runValidators: true } } = {}) => {
    return await model.findByIdAndUpdate(id, update, option)
}