import axios from 'axios';

type clovaType = 'celeb' | 'face';

export interface ClovaCeleb {
    info:  Info;
    faces: Array<Celeb>;
}

export interface Celeb {
    celebrity: Celebrity;
}

export interface Celebrity {
    value:      string;
    confidence: number;
}

export interface Info {
    size:      Size;
    faceCount: number;
}

export interface Size {
    width:  number;
    height: number;
}

export interface ClovaFace {
    info:  Info;
    faces: Array<Face>;
}

export interface Face {
    roi:      Roi;
    landmark: Landmark;
    gender:   Value;
    age:      Value;
    emotion:  Value;
    pose:     Value;
}

export interface Value {
    value:      string;
    confidence: number;
}

export interface Landmark {
    leftEye:    Position;
    rightEye:   Position;
    nose:       Position;
    leftMouth:  Position;
    rightMouth: Position;
}

export interface Position {
    x: number;
    y: number;
}

export interface Roi {
    x:      number;
    y:      number;
    width:  number;
    height: number;
}


export async function clovaFace(clovaType: clovaType, formdata: FormData) {

    const url = `/api/${clovaType}`;

    try {
        const response = await axios.post(url, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        
        return response.data;
    } catch (err) {
        return err;
    }
}