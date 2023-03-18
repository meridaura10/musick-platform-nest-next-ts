import { convertToTime } from '@/utils/convertToTime';
import React, { ChangeEvent } from 'react';

interface TrackProgressProps {
    left: number;
    right: number;
    isTime?: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const TrackProgress: React.FC<TrackProgressProps> =
    ({
        left, right, onChange, isTime = false
    }) => {
        return (
            <>
                <div style={{ display: 'flex' }}>
                    <input
                        type="range"
                        min={0}
                        max={right}
                        value={left}
                        onChange={onChange}
                    />
                    {
                        isTime ? <div>{convertToTime(left)} / {convertToTime(right)}</div> : <div>{left} / {right}</div>
                    }
                </div>
            </>
        );
    };

export default TrackProgress;