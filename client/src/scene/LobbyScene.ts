module scene {
    export class LobbyScene extends SceneBase {
        private _txt_money: egret.TextField = null
        private _txt_name: egret.TextField = null
        private _head: scene.PlayerHeadFrame = null;
        private _btn_lianwang: SButton = null;
        private _btn_haoyou: SButton = null;
        private _btn_danji: SButton = null;
        private _btn_jingji: SButton = null;
        private _setting: SButton = null;
        private _chong: SButton = null;
        private _dui: SButton = null;

        public constructor() {
            super();
        }

        public Init(): void {


            var bg: egret.Bitmap = new egret.Bitmap(RES.getRes("bg_lobby_jpg"));
            this.addChild(bg);

            this._setting = new SButton("btn_setting");
            this.addChild(this._setting);
            this._setting.x = 338;
            this._setting.y = 17;

            this._chong = new SButton("btn_chong");
            this.addChild(this._chong);
            this._chong.x = 400;
            this._chong.y = 17;

            this._dui = new SButton("btn_dui");
            this.addChild(this._dui);
            this._dui.x = 462;
            this._dui.y = 17;

            this._head = new scene.PlayerHeadFrame();
            this.addChild(this._head);
            this._head.Init(data.GameData.avatar);
            this._head.x = 2;
            this._head.y = 2;
            this._head.scaleX = this._head.scaleY = 0.7;

            this._txt_name = new egret.TextField();
            this._txt_name.size = 20;
            this._txt_name.textColor = 0xe6b980;
            this._txt_name.text = data.GameData.nickname;
            this.addChild(this._txt_name);
            this._txt_name.x = 78;
            this._txt_name.y = 12;

            this._txt_money = new egret.TextField();
            this._txt_money.size = 20;
            this._txt_money.textColor = 0xe6b980;
            this._txt_money.text = "" + data.GameData.money;
            this.addChild(this._txt_money);
            this._txt_money.x = 105;
            this._txt_money.y = 43;

            this._btn_lianwang = new SButton("btn_lianwang");
            this.addChild(this._btn_lianwang);
            this._btn_lianwang.SetBitTxt("123456789人");
            this._btn_lianwang.x = 73;
            this._btn_lianwang.y = 150;

            this._btn_haoyou = new SButton("btn_haoyou");
            this.addChild(this._btn_haoyou);
            this._btn_haoyou.SetBitTxt("123456789人");
            this._btn_haoyou.x = 73;
            this._btn_haoyou.y = 388;

            /**
             * 单机
             */
            this._btn_danji = new SButton("btn_danji");
            this.addChild(this._btn_danji);
            this._btn_danji.x = 73;
            this._btn_danji.y = 632;

            this._btn_jingji = new SButton("btn_jingji");
            this._btn_jingji.SetBitTxt("123456789人");
            this._btn_jingji.SetBitTxt("12：00开始5倍");
            this.addChild(this._btn_jingji);
            this._btn_jingji.x = 73;
            this._btn_jingji.y = 884;

            this._setting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this._chong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this._dui.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this._btn_lianwang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this._btn_haoyou.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this._btn_danji.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this._btn_jingji.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);

//            data.GameData.IsRobot_Offline = true;
//            data.GameData.flag = data.GameData.GameFlag_offline;
//            SceneMgr.Instance.ShowScene(GameScene);
        }

        public AddFreeMoney(): void {
            this._txt_money.text = "" + data.GameData.money;
        }

        private onTap(e: egret.TouchEvent): void {
            if (e.currentTarget == this._setting) {
                windowui.SettingInst.Instance.Show();
            }
            else if (e.currentTarget == this._chong) {
                windowui.ChargeInst.Instance.Show();
            }
            else if (e.currentTarget == this._dui) {
                windowui.SysTipsInst.Instance.Show("奖品兑换功能将会不定期开放,请保持关注!", function (): void {
                    windowui.SysTipsInst.Instance.Hide();
                }, null, true);
            }
            else if (e.currentTarget == this._btn_lianwang) {
                data.GameData.IsRobot_Offline = false;
                data.GameData.flag = data.GameData.GameFlag_Rapid;
                NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_CENTER_REQ_BATTLE, {flagId: data.GameData.GameFlag_Rapid});
                SceneMgr.Instance.ShowScene(GameScene);
            }
            else if (e.currentTarget == this._btn_haoyou) {
                data.GameData.IsRobot_Offline = false;
                windowui.CreatRoomInst.Instance.Show();
//                data.GameData.flag=data.GameData.GameFlag_Group;
//                SceneMgr.Instance.ShowScene(GameScene);
            }
            else if (e.currentTarget == this._btn_danji) {
                data.GameData.IsRobot_Offline = true;
                data.GameData.flag = data.GameData.GameFlag_offline;
                SceneMgr.Instance.ShowScene(GameScene);
            }
            else if (e.currentTarget == this._btn_jingji) {
                data.GameData.IsRobot_Offline = false;
                data.GameData.flag = data.GameData.GameFlag_Activity;
                NetMgr.Instance.SendMsg(enums.NetEnum.CLIENT_2_CENTER_REQ_BATTLE, {flagId: data.GameData.GameFlag_Activity});
                SceneMgr.Instance.ShowScene(GameScene);
            }
        }

    }
}