import { Request, Response } from "express"

const hello = async (req: Request, res: Response) => {
    try {
        return res.status(200).json({ msg: 'Hello' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Error occured while fetching data' })
    }
}


const all_exports = {
    hello
}

export default all_exports

