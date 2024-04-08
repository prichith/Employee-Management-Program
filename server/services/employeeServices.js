var Employee = require('../model/employee')

exports.addEmployee = async(data)=>{
    const employee  = new Employee(data);
    employee.save();
    return employee._id;
}

exports.allEmployees = async ()=>{
    let result = await Employee.find();
    return result;
}

exports.employee = async (id)=>{
    let user = await Employee.findById(id);
    return user;
}

exports.deleteEmployee = async (query)=>{
    let result = await Employee.findByIdAndDelete(query);
    return result;
}

exports.editEmployee = async (id,data)=>{
    let result = await Employee.findByIdAndUpdate(id,{$set:data},{new:true});
    return result;
}

exports.postAvatar = async (id,avatar)=>{
    let result = await Employee.findByIdAndUpdate(id,{ $set: avatar },{ new: true });
    return result;
}

exports.pagination = async (startIndex, limit, query) => {
    let aggregationPipeline = [
        { $match: query },
        {
            $facet: {
                totalCount: [{ $group: { _id: null, count: { $sum: 1 } } }],
                slicedData: [
                    { $skip: startIndex },
                    { $limit: limit },
                    { $group: { _id: null, data: { $push: "$$ROOT" } } }
                ]
            }
        },
        {
            $project: {
                totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
                slicedData: "$slicedData.data"
            }
        }
    ];
    
    let result = await Employee.aggregate(aggregationPipeline);
    if (result.length > 0) return { totalCount: result[0].totalCount, finalData: result[0].slicedData };
}
