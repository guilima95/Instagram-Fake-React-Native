import React, { Component, Props } from 'react';
import { StyleSheet, Text, View, Platform, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';



const width = Dimensions.get('screen').width;


export default class Post extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            foto: this.props.foto
        }
    }


    carregaIcone(likeada) {
        return likeada ? require('../../assets/s2-checked.png') :
            require('../../assets/s2.png')
    }

    like() {
        const { foto } = this.state;

        let novaLista = []
        if (!foto.likeada) {
            novaLista = [
                ...foto.likers,
                { login: 'guiplima95' }
            ]
        } else {
            novaLista = this.state.foto.likers.filter(liker => {
                return liker.login !== 'guiplima95'
            })
        }



        const fotoAtualizada = {
            ...this.state.foto,
            likeada: !this.state.foto.likeada,
            likers: novaLista
        }
        this.setState({ foto: fotoAtualizada })
    }

    exibeLikes(likers) {
        if (likers.length <= 0)
            return;

        return (
            <Text style={styles.likes}>
                {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>
        )
    }

    exibeLegenda(foto) {
        if (foto.comentario === '')
            return;

        return (
            <View style={styles.comentario}>
                <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
                <Text>{foto.comentario}</Text>
            </View>
        );
    }


    render() {
        const { foto } = this.state;
        return (
            <View>
                <View style={styles.header}>
                    <Image source={{ uri: foto.urlPerfil }} style={styles.imgProfile} />
                    <Text>{foto.loginUsuario}</Text>
                </View>
                <Image source={{ uri: foto.urlFoto }} style={styles.img} />
                <View style={styles.rodape}>
                    <TouchableOpacity onPress={this.like.bind(this)}>
                        <Image style={styles.botaoDeLike}
                            source={this.carregaIcone(foto.likeada)}>
                        </Image>
                    </TouchableOpacity>
                    {this.exibeLikes(foto.likers)}
                    {this.exibeLegenda(foto)}
                </View>
            </View>

        );
    }
}



const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    imgProfile: {
        margin: 10,
        borderRadius: 20,
        width: 40,
        height: 40
    },

    img: {
        width: width,
        height: width
    },
    botaoDeLike: {
        marginBottom: 10,
        height: 40,
        width: 40,
    },
    rodape: {
        margin: 10
    },
    likes: {
        fontWeight: 'bold'
    },
    comentario: {
        flexDirection: 'row',
    },
    tituloComentario: {
        fontWeight: 'bold',
        marginRight: 5,
    },
});




