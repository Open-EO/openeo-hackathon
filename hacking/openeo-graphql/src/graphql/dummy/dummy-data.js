export const dummies = [
    {
        id: 1,
        email: 'a@a.aa'
    },
    {
        id: 2,
        email: 'b@b.bb'
    }
];

export const findByEmail = email => dummies.find((dummy) => dummy.email === email); 
export const add = (args) => { 
    const newDummy = { id: getNextId(), ...args };
    dummies.push(newDummy)
    return newDummy;
 };

const getNextId = () => dummies.length + 1;