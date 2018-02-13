/**
 * Created by korman on 01.05.17.
 */

export default class Config
{
    constructor() {
        this._baseUrl = 'http://dev.coupon-backend/app_dev.php/';
        this._baseImagesPath = 'http://dev.coupon-backend/uploads/';
        this._baseFrontUrl = 'http://dev.coupon-group-buy/';
        this._weChatConfig = {
            appid:'wx9d75b312364c1703',
            redirectUri: 'http://coupon.ppcgclub.com/auth_group_buy.html',
            oa_appid: 'wx9d75b312364c1703',
            signature: 'a2c003134b82cd991e3c28967b5fdf99e8cb0e75'
        }
    }

    get baseUrl() {
        return this._baseUrl;
    }

    get baseImagePath() {
        return this._baseImagesPath;
    }

    get baseFrontUrl() {
        return this._baseFrontUrl;
    }

    get weChatConfig() {
        return this._weChatConfig;
    }

    buildAuthUrl() {
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize';
        let params = {
            appid:           this._weChatConfig.appid,
            redirect_uri:    this._weChatConfig.redirectUri,
            response_type:  'code',
            scope:          'snsapi_login',
            state:          'dev'
        };

        let paramsStr = '';

        for (let param in params) {
            if (paramsStr == '') {
                paramsStr += param + '=' + params[param];
            } else {
                paramsStr += '&' + param + '=' + params[param];
            }
        }

        return url + '?' + paramsStr + '#wechat_redirect';
    }
}