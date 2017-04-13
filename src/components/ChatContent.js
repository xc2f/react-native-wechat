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


var datas =[
	{
    isMe:false,
    talkContent:'最近在学习React Native哦！',
	},
	{
    isMe:true,
    talkContent:'听说是个跨平台开发原生App的开源引擎',
	},
  {
    isMe:false,
    talkContent:'嗯啊，很不错，可以尝试下吧。过了这段时间继续研究UE去了。唉～技术出身，就是放不下技术呀～',
  },
  {
    isMe:false,
    talkContent:'感觉编不下去对话了呀......感觉编不下去对话了呀......感觉编不下去对话了呀......感觉编不下去对话了呀......',
  },
  {
    isMe:true,
    talkContent:'无语！',
  },
  {
    isMe:false,
    talkContent:'自说自话，好难！随便补充点字数吧，嗯 就酱紫 :) ',
  },
  {
    isMe:true,
    talkContent:'感觉编不下去对话了呀......感觉编不下去对话了呀..',
  },
  {
    isMe:false,
    talkContent:'GG,思密达编不下去了!',
  },
  {
    isMe:true,
    talkContent:'talk show! talk show! talk show!',
  },
  {
    isMe:false,
    talkContent:'talk show! talk show! ',
  },
    {
    isMe:false,
    talkContent:'talk show! talk show! ',
  },
    {
    isMe:false,
    talkContent:'talk show! talk show! ',
  },
    {
    isMe:false,
    talkContent:'talk show! talk show! ',
  }
];


export default class FarmChildView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          inputContentText:'',
          dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
        };
        this.listHeight = 0;
        this.footerY = 0;
        this._listview = null;
        this._keyboardDidShow = this._keyboardDidShow.bind(this);
        this._keyboardDidHide = this._keyboardDidHide.bind(this);
    }

    componentDidMount() {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(datas)
        });
    }
    renderEveryData(eData) {
  		return (
  			<View style={{flexDirection:'row',alignItems: 'center'}}>
          {/*<Image
            source={eData.isMe==true? null:require('./res/headIcon/ox1.png')}
            style={eData.isMe==true?null:styles.talkImg}
          />*/}
  				<View style={eData.isMe==true?styles.talkViewRight:styles.talkView}>
            <Text style={ styles.talkText }>
            		  {eData.talkContent}
            </Text>
  				</View>
          {/*<Image
            source={eData.isMe==true? require('./res/headIcon/ox2.png') :null}
            style={eData.isMe==true?styles.talkImgRight:null}
          />*/}
  			</View>
  		);
  	}

    myRenderFooter(e){
      return <View onLayout={(e)=> {
         this.footerY= e.nativeEvent.layout.y;

         if (this.listHeight && this.footerY &&this.footerY>this.listHeight) {
           var scrollDistance = this.listHeight - this.footerY;
           this.refs._listView.scrollTo({y:-scrollDistance});
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
      console.log(this);

    }

    _keyboardDidHide () {
      console.log(this);

    }


    render() {
        return (
            <View style={ styles.container }>
              <ListView
                ref={el => this._listview = el}
                onLayout={(e)=>{this.listHeight = e.nativeEvent;}}
                dataSource={this.state.dataSource}
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
  },

  talkView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 12,
    borderRadius:5,
    marginLeft:5,
    marginRight:55,
    marginBottom:15
  },
  talkImg: {
    height: 40,
    width: 40,
    marginLeft:10,
    marginBottom:10
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
    marginLeft:55,
    marginRight:5,
    marginBottom:10
  },
  talkImgRight: {
    height: 40,
    width: 40,
    marginRight:10,
    marginBottom:10
    },
});
