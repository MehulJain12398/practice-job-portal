const paginate = (paginateData) => {
    const itemsPerPage = 12;
    const pages = Math.ceil(paginateData.length / itemsPerPage)

    const newData = Array.from({length:pages}, (_,index) => {
        const start = index * itemsPerPage
        return paginateData.slice(start,start + itemsPerPage)
    })

    return newData


}

export default paginate