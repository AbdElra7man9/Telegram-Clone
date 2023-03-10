import React from 'react'
import { BsMicFill } from 'react-icons/bs';
import { MdOutlineCallEnd } from 'react-icons/md';
import { FeaturesAction } from './../../Redux/Slices/FeaturesSlice';
import { useDispatch, useSelector } from 'react-redux';
import ModalVideo from './ModalVideo';
import { usePeer } from '../Exports';

const MainVideo = ({ userById }) => {
    const dispatch = useDispatch();
    const { isVideoModal } = useSelector(state => state.Features);
    const { acceptorName, callingInfo } = usePeer();
    return (
        <>
            {isVideoModal && <ModalVideo />}
            <div
                onClick={() => dispatch(FeaturesAction.setIsVideoModal(true))}
                className='w-full flex justify-between py-2 px-5 bg-slate-400 text-white cursor-pointer'>
                <div className='flex gap-2 items-center'>
                    <BsMicFill size={20} />
                    <h3 className='font-semibold'>Ringing ...</h3>
                </div>
                <h3 className='text-lg font-gray-500 font-semibold'>{callingInfo.callerName || acceptorName}</h3>

                <div>
                    <button><MdOutlineCallEnd size={25} /></button>
                </div>
            </div>
        </>
    )
}

export default MainVideo
