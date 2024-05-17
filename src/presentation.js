import React, { useState, useEffect } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { IoPhonePortrait, IoNewspaper } from 'react-icons/io5';
import { useSpring, animated } from 'react-spring';
import io from 'socket.io-client';

const animations = [
    { to: { left: '42%', top: '15%' }, from: { left: '5%', top: '15%' } },
    { to: { left: '40%', top: '49%' }, from: { left: '47%', top: '20%' } },
    { to: { left: '47%', top: '20%' }, from: { left: '40%', top: '49%' } },
    { to: { left: '80%', top: '15%' }, from: { left: '50%', top: '15%' } },
];
const socket = io('wss://back.qrcds.site');

const Presentation = () => {
    const [currentAnimation, setCurrentAnimation] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [animationData, setAnimationData] = useState({
        animation_1: null,
        animation_2: null,
        animation_3: null,
        animation_4: null,
    });

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalContent('');
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAnimation((prevAnimation) => (prevAnimation + 1) % animations.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        socket.on('animation_1', (data) => {
            console.log('Received animation_1 data:', data);
            setAnimationData((prevData) => ({ ...prevData, animation_1: JSON.stringify(data, null, 2) }));
        });

        socket.on('animation_2', (data) => {
            console.log('Received animation_2 data:', data);
            setAnimationData((prevData) => ({ ...prevData, animation_2: JSON.stringify(data, null, 2) }));
        });

        socket.on('animation_3', (data) => {
            console.log('Received animation_3 data:', data);
            setAnimationData((prevData) => ({ ...prevData, animation_3: JSON.stringify(data, null, 2) }));
        });

        socket.on('animation_4', (data) => {
            console.log('Received animation_4 data:', data);
            setAnimationData((prevData) => ({ ...prevData, animation_4: JSON.stringify(data, null, 2) }));
        });

        return () => {
            socket.off('animation_1');
            socket.off('animation_2');
            socket.off('animation_3');
            socket.off('animation_4');
        };
    }, []);

    const handleEnvelopePress = () => {
        if (currentAnimation === 0 && animationData.animation_1) {
            setModalContent(animationData.animation_1);
        } else if (currentAnimation === 1 && animationData.animation_2) {
            setModalContent(animationData.animation_2);
        } else if (currentAnimation === 2 && animationData.animation_3) {
            setModalContent(animationData.animation_3);
        } else if (currentAnimation === 3 && animationData.animation_4) {
            setModalContent(animationData.animation_4);
        }
        setModalVisible(true);
    };

    const envelopeStyle = useSpring({
        from: animations[currentAnimation].from,
        to: animations[currentAnimation].to,
        reset: true,
        config: { duration: 4000 },
    });

    const styles = {
        app: {
            position: 'relative',
            width: '100vw',
            height: '100vh',
            backgroundColor: '#f0f0f0',
            overflow: 'hidden',
        },
        svg: {
            position: 'absolute',
            top: 0,
            left: 0,
        },
        phone: {
            position: 'absolute',
            width: '50px',
            height: '50px',
            color: 'black',
            left: '2%',
            top: '12%',
        },
        newspaper: {
            position: 'absolute',
            width: '50px',
            height: '50px',
            color: 'black',
            left: '45%',
            top: '12%',
        },
        cmdb: {
            position: 'absolute',
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'black',
            left: '38%',
            top: '53%',
            borderRadius: '10px',
        },
        itsm: {
            position: 'absolute',
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'black',
            left: '83%',
            top: '13%',
        },
        modal: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        modalContent: {
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
        envelope: {
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
        },
    };

    return (
        <div style={styles.app}>
            <svg height="100%" width="100%" style={styles.svg}>
                <line x1="46%" y1="15%" x2="5%" y2="15%" stroke="black" strokeWidth="5" />
                <line x1="46%" y1="17%" x2="40%" y2="53%" stroke="black" strokeWidth="5" />
                <line x1="47%" y1="15%" x2="83%" y2="15%" stroke="black" strokeWidth="5" />
            </svg>
            <IoPhonePortrait style={styles.phone} />
            <IoNewspaper style={styles.newspaper} />
            <div style={styles.cmdb}>CMDB</div>
            <div style={styles.itsm}>ITSM</div>
            <animated.div style={{ ...envelopeStyle, ...styles.envelope }}>
                <div onClick={handleEnvelopePress}>
                    <FaEnvelope size={24} color="black" />
                </div>
            </animated.div>
            {modalVisible && (
                <div style={styles.modal} onClick={closeModal}>
                    <div style={styles.modalContent}>
                        <p>{modalContent}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Presentation;
