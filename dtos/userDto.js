module.exports = class UserDto {
    email;
    id;
    role;
    isActivated;
    activationLink;
    nickname;
    img;
    isPaidSelection;

    constructor(model) {
        this.email = model.email
        this.id = model.id
        this.role = model.role
        this.isActivated = model.isActivated
        this.activationLink = model.activationLink
        this.img = model.img
        this.nickname = model.nickname
        this.isPaidSelection = model.isPaidSelection
    }
}