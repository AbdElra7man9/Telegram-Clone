import { asyncHandler } from '../Middlewares/asyncHandler.js';
import Chat from '../Models/Chat.js';
import ErrorHandler from '../Utils/ErrorHandler.js';
import Features from './../Utils/Features.js';
import GroupDiscriminator from './../Models/GroupDiscriminator.js';

export const NewGroup = asyncHandler(async (req, res, next) => {
    // const users = [...req.body.members]
    const ColorsArray = [
        '#7f1d1d', '#18181b', '#7c2d12', '#78350f', '#713f12', '#365314', '#1e3a8a', '#312e81', '#4c1d95', '#831843', '#881337'
    ];
    const color = ColorsArray[Math.floor(Math.random() * ColorsArray.length)];

    await new Chat({
        members: [...req.body.members, req.user.id], color
    }).save()
        .then((chat) => {
            return res.json(chat);
        })
        .catch((err) => {
            return next(new ErrorHandler(err.message, 404));
        })
});
export const GetGroup = asyncHandler(async (req, res, next) => {
    const resultperpage = 10;
    const features = new Features(GroupDiscriminator.find(
        {
            members: { $in: [req.user.id] },
            lastMSG: { $ne: null }
        }), req.query)
        .Pagination(resultperpage)

    const Chats = await features.query
        .populate('members', 'username avatar firstname lastname')
        .sort('-updatedAt')
    return res.json(Chats)
});
