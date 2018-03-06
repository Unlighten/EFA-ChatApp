import { Platform, Dimensions } from "react-native";
import metrics from '../../../theme/config/metrics'
import commonColor from "../../../theme/commonColor";

export default {

    button: {
        flex: 1, 
        padding: 15, 
        margin: 10
    },
    buttons: {
        justifyContent: 'space-around', 
        flexDirection: 'row'
    },
    deletePhotoBtn: {
        backgroundColor: 'red'
    },
    takePhotoBtn: {
        backgroundColor: commonColor.brandColor
    },
    pickPhotoBtn: {
        backgroundColor: commonColor.buttonColor
    },
}