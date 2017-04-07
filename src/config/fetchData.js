
const FETCH_URL = 'http://192.168.0.104:8080/WeChat/findall/find.spring';

export default function _fetch() {
    fetch(FETCH_URL)
      .then( (res) =>
        res.json()
      )
      // .then( resJson => {

      //   this.setState({
      //     data: resJson,
      //     dataReceived: true
      //   })
      //   }
      // )
      .then( resJson => {
        return resJson;
      })
      .catch( err => {
        console.warn(err)
      })
      .done()
}
