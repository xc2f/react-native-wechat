import React, {
  Component
} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  PixelRatio,
  ListView,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard
 } from 'react-native';


export default class FarmChildView extends React.Component {
    constructor(props) {
        super(props);
        this.listHeight = 0;
        this.footerY = 0;
        this._listview = null;
        this._keyboardDidShow = this._keyboardDidShow.bind(this);
        this._keyboardDidHide = this._keyboardDidHide.bind(this);
    }

    // componentDidMount() {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRows(datas)
    //     });
    // }
    renderEveryData(eData) {
  		return (
  			<View style={{flexDirection:'row',alignItems: 'center'}}>
          <Image
            source={eData.isMe==true? null:require('../config/happy.png')}
            style={eData.isMe==true?null:styles.talkImg}
          />
  				<View style={eData.isMe==true?styles.talkViewRight:styles.talkView}>
            {eData.isMe==true? <Text style={[styles.time, styles.timeRight]}>{eData.time}</Text> : <View />}
            <Text style={ styles.talkText }>
            		  {eData.talkContent}
            </Text>
            {eData.isMe==true? <View /> : <Text style={[styles.time, styles.timeLeft]}>{eData.time}</Text>}
  				</View>
          <Image
            source={eData.isMe==true? require('../config/mb.png') :null}
            style={eData.isMe==true?styles.talkImgRight:null}
          />
  			</View>
  		);
  	}

    myRenderFooter(e){

      // 通过在footer渲染一个无高度的view，获取其y轴坐标，使进入后保持在页面底部
      return <View onLayout={(e)=> {
         this.footerY= e.nativeEvent.layout.y;
         {/*console.log(this.footerY, this.listHeight);*/}
         if (this.listHeight && this.footerY &&this.footerY>this.listHeight) {
           {/*var scrollDistance = this.listHeight - this.footerY;
           this._listView.scrollTo({y:-scrollDistance});*/}
           this._listview.scrollToEnd({animated: false});
         }
       }}/>
    }

    pressSendBtn(){
    }

      // Keyboard
    componentWillMount () {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount () {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow () {
      // 键盘起来后拉到底部
      // 加入判断防止内容不够高时被强行拉到底部，上面空余
      if (this.listHeight && this.footerY &&this.footerY>this.listHeight) {
        this._listview.scrollToEnd();
      }
    }

    _keyboardDidHide () {
      // 避免收起键盘后底部空余一大片
      if (this.listHeight && this.footerY &&this.footerY>this.listHeight) {
        this._listview.scrollToEnd();
      }
    }


    render() {
      // console.log(this.props.newMessage)
        return (
            <View style={ styles.container }>
              <ListView
                ref={el => this._listview = el}
                onLayout={(e)=>{this.listHeight = e.nativeEvent.layout.height;}}
                dataSource={this.props.dataSource}
                renderRow={this.renderEveryData.bind(this)}
                renderFooter={this.myRenderFooter.bind(this)}
              />
            </View>
        );
    }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    marginTop: 15,
  },

  talkView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    borderRadius:5,
    marginLeft:5,
    marginRight:100,
    marginBottom:30
  },
  talkImg: {
    height: 40,
    width: 40,
    marginLeft:10,
    marginBottom:30
    },
  talkText: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    },
  talkViewRight: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#90EE90',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    borderRadius:5,
    marginLeft:100,
    marginRight:5,
    marginBottom:30
  },
  talkImgRight: {
    height: 40,
    width: 40,
    marginRight:10,
    marginBottom:30
  },
  time: {
    position: 'relative',
    fontSize: 12,
    color: '#999',
    alignSelf: 'flex-end',
    top: 10,
    backgroundColor: 'transparent',
  },
  timeLeft: {
    left: 50,
  },
  timeRight: {
    right: 50,
  },
});
