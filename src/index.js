import './style.scss'

const array = []

if(array.includes('x') && array[0]?.b.c) {

    console.log(a)

    const p = () => new Promise((resolve, reject) => {
        resolve(array.map(item => {
            return item ?? 
                ( Object.prototype.toString.call(item).slice(8, -1) === 'Array' ?
                    item.flat() : item )
        }))
    })

    p()
}
