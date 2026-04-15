export class UserMainData {
    constructor(data) {
        this.id = data.id
        this.firstName = data.userInfos.firstName
        this.lastName = data.userInfos.lastName
        this.age = data.userInfos.age
        this.score = data.score ?? data.todayScore
        this.keyData = data.keyData
    }
}
