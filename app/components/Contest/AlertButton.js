var React = require('react');

var AlertButton = React.createClass({
    onClickHandler: function(){
      var component = this;
      var icon_path = function (platform){
          switch (platform){
              case "CODECHEF":
                  return "img/codechef.jpg";
              case "HACKEREARTH":
                  return "img/hackerearth.png";
              case "CODEFORCES":
                  return "img/codeforces.png";
              case "TOPCODER":
                  return "img/topcoder.gif";
              case "HACKERRANK":
                  return "img/hackerrank.png";
              case "GOOGLE":
                  return "img/google.png";
              default:
                  return "img/other.png";
          }
      }
      var opt = {
        type: "basic",
        title: "Desktop Notification 10 min before contest",
        message: "PERMIUM FEATURE. Upgrade Coder's Calendar to Premium version to use this feature",
        iconUrl: "../img/notification.png",
        buttons: [{"title": "See Example!"}, {"title": "Upgrade"}]
      }
      var currentNotificationId;
      chrome.notifications.create(opt, function(id){currentNotificationId = id;});
      chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex){
        if(notificationId == currentNotificationId && buttonIndex == 0){
          var opt = {
            type: "basic",
            title: component.props.details.Name,
            message: "will begin in " + component.props.details.Duration,
            iconUrl: icon_path(component.props.details.Platform)
          }
          chrome.notifications.create(opt);
        }else if(notificationId == currentNotificationId && buttonIndex == 1){
          // Lead to Upgrade path
          return null
        }
      });
    },
    render: function(){
        if (this.props.type == 'upcoming'){
            return(
              <i
                className="fa fa-bell-o fa-lg option-icon"
                style={{"color": "#000000", "cursor": "pointer"}}
                onClick={this.onClickHandler}
                title="Desktop Notification Alert"
              />
            )
        }else{
            return null
        }
    }
});

AlertButton.propTypes = {
  type: React.PropTypes.string,
  details: React.PropTypes.object
}

module.exports = AlertButton;