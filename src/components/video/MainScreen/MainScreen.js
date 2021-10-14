import React, { useRef, useEffect } from "react";
import MeetingFooter from "../MeetingFooter/MeetingFooter.component";
import Participants from "../Participants/Participants.component";
import "./MainScreen.css";
import { connect } from "react-redux";
import { setMainStream, updateUser } from "../../../store/actioncreator";
import { faKaaba } from "@fortawesome/free-solid-svg-icons";
// For detection in Mozilla Firefox
navigator.getUserMedia = (navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia);

const MainScreen = (props) => {
  const participantRef = useRef(props.participants);

  const onMicClick = (micEnabled) => {
    if (props.stream) {
      props.stream.getAudioTracks()[0].enabled = micEnabled;
      props.updateUser({ audio: micEnabled });
    }
  };
  // const onVideoClick = (videoEnabled) => {
  //   console.log("enter");
  //   console.log("props.stream", props.stream);

  //   if (props.stream) {
  //     console.log("videoEnabled = ", videoEnabled);
  //     props.stream.getVideoTracks()[0].enabled = videoEnabled;
  //     props.updateUser({ video: videoEnabled });
  //     if (videoEnabled === false) {
  //       console.log("Now turn light off");
  //       props.stream.getVideoTracks()[0].stop();
  //     }
  //   }
  //   console.log("----------")
  // };

  const onVideoClick = async (videoEnabled) => {
    var gumStream;
    console.log("videoEnabled = ", videoEnabled);
    if (videoEnabled === true) {
      navigator.getUserMedia({ video: true },
        function (stream) {
          gumStream = stream;
          // ...
          if (gumStream.active) {
            // do something with the stream
            console.log("yeah start");
            gumStream.getVideoTracks()[0].enabled = videoEnabled;
            if (props.stream)
              props.stream.getVideoTracks()[0].enabled = videoEnabled;
            updateStream(gumStream);
            // props.setMainStream(gumStream);
            props.updateUser({ video: videoEnabled });
          }
        },
        function (error) {
          console.log('getUserMedia() error', error);
        });
    }
    else {
      navigator.getUserMedia({ video: true },
        function (stream) {
          console.log("STOP");
          // can also use getAudioTracks() or getVideoTracks()

          // @@@
          // var track = stream.getTracks()[0];  // if only one media track
          // // ...
          // track.stop();
          stream.getVideoTracks()[0].stop();
          // OR THIS
          // stream.getTracks().forEach(function (track) {
          //   console.log("Really stopping");
          //   track.stop();

          // });
          //  @@@ Changing !@!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          if (props.stream) {
            props.stream.getVideoTracks()[0].stop();

            // OR THIS
            // props.stream.getTracks().forEach(function (track) {
            //   console.log("props stopping");
            //   track.stop();
            // });
            props.stream.getVideoTracks()[0].enabled = videoEnabled;
          }
          // props.setMainStream(gumStream);
          props.updateUser({ video: videoEnabled });
          updateStream(gumStream);
          // updateStream(gumStream);
        },
        function (error) {
          console.log('getUserMedia() error', error);
        });
    }


  };
  // var localStream;
  // console.log("props before val = ", props.stream);
  // console.log("localStream before val = ", localStream);
  // // localStream = await navigator.mediaDevices.getUserMedia({
  // //   audio: true,
  // //   video: true,
  // // });

  // if (localStream.getVideoTracks()[0].enabled === false) {
  //   console.log("camera stopped");
  //   localStream.getVideoTracks()[0].stop();
  //   localStream.getVideoTracks()[0].stop();

  // } else if (localStream.getVideoTracks()[0].enabled === true) {
  //   console.log("camera started");

  //   localStream = await navigator.mediaDevices.getUserMedia({
  //     audio: true,
  //     video: true,
  //   });
  //   // localStream.getVideoTracks()[0].enabled = false;
  //   updateStream(localStream);
  // }

  // localStream.getVideoTracks()[0].enabled = videoEnabled;

  // // props.stream.getVideoTracks()[0].enabled = videoEnabled;
  // props.updateUser({ video: videoEnabled });


  // if (props.stream) {
  //   if (props.stream.getVideoTracks()[0].enabled === true) {
  //     console.log("camera stopped");
  //     // Causes issues with turning cam back on
  //     props.stream.getVideoTracks()[0].stop();
  //     if (localStream) {
  //       console.log("localstream stopped");
  //       localStream.getVideoTracks()[0].stop();
  //     }

  //   }
  //   else if (props.stream.getVideoTracks()[0].enabled === false) {
  //     // Camera started
  //     console.log("camera started");
  //     localStream = await navigator.mediaDevices.getUserMedia({
  //       audio: true,
  //       video: true,
  //     });


  //     // const stream = getUserStream();
  //     localStream.getVideoTracks()[0].enabled = true;
  //     props.setMainStream(localStream);
  //     // updateStream(localStream);

  //   }
  //   props.stream.getVideoTracks()[0].enabled = videoEnabled;
  //   props.updateUser({ video: videoEnabled });
  // }
  // };


  // const onVideoClick = (videoEnabled) => {
  //   if (props.stream) {
  //     console.log(props.stream.getVideoTracks()[0].enabled + "@@before" + videoEnabled);
  //     if (props.stream.getVideoTracks()[0].enabled === true) {
  //       console.log("camera stopped");
  //       // Causes issues with turning cam back on
  //       props.stream.getVideoTracks()[0].stop();
  //     }
  //     else if (props.stream.getVideoTracks()[0].enabled === false) {





  //       const localStream = navigator.mediaDevices.getUserMedia({
  //         audio: true,
  //         video: true,
  //       });



  //       // const stream = getUserStream();
  //       // stream.getVideoTracks()[0].enabled = false;
  //       // props.setMainStream(localStream);
  //       updateStream(localStream);

  //     }
  //     props.stream.getVideoTracks()[0].enabled = videoEnabled;
  //     props.updateUser({ video: videoEnabled });
  //     console.log(props.stream.getVideoTracks()[0].enabled + "@@later");
  //   }
  // };

  useEffect(() => {
    participantRef.current = props.participants;
  }, [props.participants]);

  const updateStream = (stream) => {
    for (let key in participantRef.current) {
      const sender = participantRef.current[key];
      if (sender.currentUser) continue;
      const peerConnection = sender.peerConnection
        .getSenders()
        .find((s) => (s.track ? s.track.kind === "video" : false));
      peerConnection.replaceTrack(stream.getVideoTracks()[0]);
    }
    props.setMainStream(stream);
  };

  const onScreenShareEnd = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    localStream.getVideoTracks()[0].enabled = Object.values(
      props.currentUser
    )[0].video;

    updateStream(localStream);

    props.updateUser({ screen: false });
  };

  const onScreenClick = async () => {
    let mediaStream;
    if (navigator.getDisplayMedia) {
      mediaStream = await navigator.getDisplayMedia({ video: true });
    } else if (navigator.mediaDevices.getDisplayMedia) {
      mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
    } else {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { mediaSource: "screen" },
      });
    }

    mediaStream.getVideoTracks()[0].onended = onScreenShareEnd;

    updateStream(mediaStream);

    props.updateUser({ screen: true });
  };


  return (
    <div className="wrapper">
      <div className="main-screen">
        <Participants />
      </div>

      <div className="footer">
        <MeetingFooter
          onScreenClick={onScreenClick}
          onMicClick={onMicClick}
          onVideoClick={onVideoClick}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    stream: state.mainStream,
    participants: state.participants,
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMainStream: (stream) => dispatch(setMainStream(stream)),
    updateUser: (user) => dispatch(updateUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
