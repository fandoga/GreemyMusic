export default interface TrackData {
    Img: string;
    ImgMed?: string;
    ImgBig?: string
    Name: string;
    Status?: {
        selected: boolean;
    }
    Author: string;
    Album: string;
    Time: string;
    Info: string;
}