let obj = {
    name: 'ellie'
};
// && : obj.name 없는 경우 방지
// 1번
if (obj) {
    console.log(obj.name)
}
//2번
obj && console.log(obj.name);