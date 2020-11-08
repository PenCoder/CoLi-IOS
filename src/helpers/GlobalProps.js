import { observable, action } from "mobx";

export class GlobalProps {

    @observable existing = false;
    @observable user = {};
    @observable userId = {};
    @observable pack = {};
    @observable selectedPack = {};
    @observable packs = [];
    @observable data = {};
    @observable outstanding = '';
    @observable main = {};
    @observable time = 0;
    @observable days = 0;
    @observable percentage = 0;
    @observable userid = '';
    @observable days_percent = 0.0;

    @observable referrer = {};
    @observable refcode = '';
    @observable refClients = [];
    @observable subusername = '';
    @observable subpack = '';
    @observable subphone = '';

    @observable invoice = '';
    @observable installationCost = 149;

    @observable additionalUsers = [];
    @observable addedProfile = {};
    @observable topup_balance = '';

    @action updateProp = (prop, value) => {
        this[prop] = value;
    }
}