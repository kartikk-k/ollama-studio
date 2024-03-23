
function paginate<T>(items: T[], pageNumber: number, pageSize: number = 10): T[] {

    const maxPage = Math.ceil(items.length / pageSize);

    if(pageNumber < 1 || pageNumber > maxPage) throw(`Invalid page number, max: ${maxPage}`);

    return items.slice(pageNumber - 1, pageNumber * pageSize);
}

export default paginate;