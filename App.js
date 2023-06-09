import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text,TextInput, View,Button, StyleSheet,TouchableOpacity, Image} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//expo install react-native-screens react-native-safe-area-context
//npm install @react-navigation/native-stack



function HomeScreen({ navigation }) {

  const verificar = ()=>{

      navigation.navigate('CadastrarProfessor')

  } 
  const verificarBLA = ()=>{

    navigation.navigate('ConsultaProfessor')

  } 

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>


      <View style={styles.background}>
      <Image style={{height:'11em',width:'100%',marginTop:'-0em', position:'absolute',zIndex:'5'}} source={"https://i.pinimg.com/originals/a6/c7/e6/a6c7e6a9d641ccf2d91162adf3f44ff0.png"}/>
            <View style={styles.boxButton}>
              <TouchableOpacity title="Insert Professor" onPress= {()=> verificar()} style={styles.button}>
                <View  style={styles.rowButton}>
                <Image style={styles.imgButton} source={"https://i.pinimg.com/originals/53/79/9d/53799d51a62bd28cb04c8a4c57f054c9.png"}/>
                <Text  style={styles.textButtonStyle}>Cadastrar Professor</Text>
                </View>
              </TouchableOpacity>

                <TouchableOpacity title="Consulta Professor"   onPress= {()=> verificarBLA()} style={styles.button}>
                  <View  style={styles.rowButton}>
                  <Image style={styles.imgButton} source={"https://cdn-icons-png.flaticon.com/512/1950/1950715.png"}/>
                  <Text  style={styles.textButtonStyle}>Consultar Professor</Text>
                  </View>
                </TouchableOpacity>
            </View>
            <Image style={{height:'17em',width:'100%',marginTop:'35em', position:'absolute',zIndex:'5'}} source={"https://i.pinimg.com/originals/a6/c7/e6/a6c7e6a9d641ccf2d91162adf3f44ff0.png"}/>
      </View>

    </View>
  );
}

function AlunoScreen({navigation}){//colocar os dois botoes
      const consultaAluno=()=>{
          navigation.navigate('ConsultaAluno')// função pro botao que vai para a parte de consulta de aluno
      }

      const cadastroAluno=()=>{
          navigation.navigate('CadastroAluno')// funcao para o botao que vai para parte de cadastro do aluno
      }
return(
      <View style={styles.background}>
<Image style={{height:'11em',width:'100%',marginTop:'-0em', position:'absolute',zIndex:'5'}} source={"https://i.pinimg.com/originals/a6/c7/e6/a6c7e6a9d641ccf2d91162adf3f44ff0.png"}/>
      <View style={styles.boxButton}>
        <TouchableOpacity title="Insert Professor" onPress= {()=> cadastroAluno()} style={styles.button}>
          <View  style={styles.rowButton}>
          <Image style={styles.imgButton} source={"https://i.pinimg.com/originals/53/79/9d/53799d51a62bd28cb04c8a4c57f054c9.png"}/>
          <Text  style={styles.textButtonStyle}>Cadastrar Aluno</Text>
          </View>
        </TouchableOpacity>

          <TouchableOpacity title="Consulta Professor"   onPress= {()=> consultaAluno()} style={styles.button}>
            <View  style={styles.rowButton}>
            <Image style={styles.imgButton} source={"https://cdn-icons-png.flaticon.com/512/1950/1950715.png"}/>
            <Text  style={styles.textButtonStyle}>Consultar Aluno</Text>
            </View>
          </TouchableOpacity>
      </View>
      <Image style={{height:'17em',width:'100%',marginTop:'35em', position:'absolute',zIndex:'5'}} source={"https://i.pinimg.com/originals/a6/c7/e6/a6c7e6a9d641ccf2d91162adf3f44ff0.png"}/>
    </View>
);



}



function cadastroAluno({navigation}){
    const [nome,setNome] = useState()
    const [turma,setTurma] = useState()
    const [dados,setDados] = useState()


    const verificar = ()=>{   
      const valores = nome
      const valores2 = turma

      fetch('http://localhost:8080/projeto-evento/aluno-inserir.php', {
        method: 'post',
        header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body:JSON.stringify({
          nome: nome,				//n sei se isso aq vai interfirir ent n sei
          turma: turma,
        })			
      })
      setDados(valores, valores2)        
    } 

    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.background}>

          <View style={styles.boxButton}>
          <Text style={styles.textButtonStyle2}> Cadastrar Aluno </Text>
                <TextInput                         
                    style={styles.inptStyle}   
                    placeholder='Digite o nome do aluno'

                    autoFocus={true}     
                    onChangeText = {text =>setNome(text)}
                  />  
                  <TextInput                         
                    style={styles.inptStyle}   
                    placeholder='Digite a turma do aluno'
    
                    onChangeText = {text =>setTurma(text)}
                  />    
            <TouchableOpacity title="Insert Aluno" onPress= {()=> verificar()} style={styles.button}>
              <View  style={styles.rowButton}>
              <Image style={styles.imgButton} source={"https://cdn-icons-png.flaticon.com/512/149/149654.png"}/>
              <Text  style={styles.textButtonStyle1}>Salvar</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity title="Voltar"   onPress={() => navigation.navigate('telaAluno')} style={styles.button}>
                  <View  style={styles.rowButton}>
                  <Image style={styles.imgButton} source={"https://clipart-library.com/images/ziX5GKgAT.png"}/>
                  <Text  style={styles.textButtonStyle1}>Voltar</Text>
                  </View>
        </TouchableOpacity>
          </View>

      </View>




    </View>

    );
}






function ConsultaAluno({navigation}){

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  const consultarAluno = async () => {
    try {
      const response = await fetch('http://localhost:8080/projeto-evento/aluno-json.php');
      const json = await response.json();
      setData(json.aluno);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    consultarAluno();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24,backgroundColor:'#459adc'}} >

      <View>
        <Text style={styles.title}>Alunos Cadastrados</Text>
      </View>
      <View style={styles.cuboApresnt} >
      {isLoading ? <ActivityIndicator/> : (

        <FlatList


          data={data}
          keyExtractor={({ idAluno }, index) => idAluno}
          renderItem={({ item }) => (

            <Text style={styles.listProf}> {item.nomeAluno}, {item.turma}</Text>
          )}
        />
      )}
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>



      <TouchableOpacity title="Voltar"   onPress={() => navigation.navigate('telaAluno')} style={styles.button}>
                  <View  style={styles.rowButton}>
                  <Image style={styles.imgButton} source={"https://clipart-library.com/images/ziX5GKgAT.png"}/>
                  <Text  style={styles.textButtonStyle1}>Voltar</Text>
                  </View>
        </TouchableOpacity>

  </View>
    </View>
  );

}


  function BLA({ navigation }){
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getProfessores = async () => {
      try {
        const response = await fetch('http://localhost:8080/projeto-evento/professor-json.php');
        const json = await response.json();
        setData(json.professor);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      getProfessores();
    }, []);

    return (
      <View style={{ flex: 1, padding: 24,backgroundColor:'#459adc'}} >

        <View>
          <Text style={styles.title}>Professores Cadastrados</Text>
        </View>
        <View style={styles.cuboApresnt} >
        {isLoading ? <ActivityIndicator/> : (

          <FlatList


            data={data}
           keyExtractor={({ idProfessor }, index) => idProfessor}
            renderItem={({ item }) => (

              <Text style={styles.listProf}>{item.nomeProfessor}</Text>
            )}
          />
        )}
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>



        <TouchableOpacity title="Voltar"   onPress={() => navigation.navigate('telaProfessor')} style={styles.button}>
                  <View  style={styles.rowButton}>
                  <Image style={styles.imgButton} source={"https://clipart-library.com/images/ziX5GKgAT.png"}/>
                  <Text  style={styles.textButtonStyle1}>Voltar</Text>
                  </View>
        </TouchableOpacity>

    </View>
      </View>
    );
  };

function DetailsScreen({ navigation }) {

  const [professor,setProfessor] = useState()
  const [dados,setDados] = useState()


  const verificar = ()=>{   
    const valores = professor

		fetch('http://localhost:8080/projeto-evento/professor-inserir.php', {
			method: 'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				professor: professor,				
			})			
		})
    setDados(valores)        
  } 

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.background}>

          <View style={styles.boxButton}>
          <Text style={styles.textButtonStyle2}> Cadastrar Professor </Text>
                <TextInput                         
                    style={styles.inptStyle}   
                    placeholder='Digite o nome do professor'

                    autoFocus={true}     
                    onChangeText = {text =>setProfessor(text)}
                  />    
            <TouchableOpacity title="Insert Professor" onPress= {()=> verificar()} style={styles.button}>
              <View  style={styles.rowButton}>
              <Image style={styles.imgButton} source={"https://cdn-icons-png.flaticon.com/512/149/149654.png"}/>
              <Text  style={styles.textButtonStyle1}>Salvar</Text>
              </View>
            </TouchableOpacity>

              <TouchableOpacity title="Voltar" onPress={() => navigation.navigate('telaProfessor')} style={styles.button}>
                <View  style={styles.rowButton}>
                <Image style={styles.imgButton} source={"https://clipart-library.com/images/ziX5GKgAT.png"}/>
                <Text  style={styles.textButtonStyle1}>Voltar</Text>
                </View>
              </TouchableOpacity>
          </View>

      </View>




    </View>
  );
}
function Usuário({ navigation }){


return(

<View style={styles.telaInicialContainer}>
<Image style={{height:'11em',width:'100%',marginTop:'-0em', position:'absolute',zIndex:'5'}} source={"https://i.pinimg.com/originals/a6/c7/e6/a6c7e6a9d641ccf2d91162adf3f44ff0.png"}/>
<Text  style={{position:'absolute',marginTop:"50%", color:'white', fontSize:'40px', fontFamily:'Times New Roman', fontWeight:'bold', marginLeft:'55px', textAlign:'center'}}>Bem-vindo a Etec{'\n'}de{'\n'}Guaianases</Text>

    <View style={styles.rowCards}>
          
           <TouchableOpacity title="Aluno" onPress= {()=>navigation.navigate('telaAluno')} style={styles.card}>
                <View  style={styles.columnButton}>
                <Image style={styles.imgButtonCard} source={"https://cdn-icons-png.flaticon.com/512/57/57073.png"}/>
                <Text  style={styles.textButtonCard1}>Aluno</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity title="Aluno" onPress={() => navigation.navigate('telaProfessor')} style={styles.card}>
                <View  style={styles.columnButton}>
                <Image style={styles.imgButtonCard1} source={"https://icons.veryicon.com/png/o/miscellaneous/people-4/teacher-14.png"}/>
                <Text  style={styles.textButtonCard}>Professor</Text>
                </View>
            </TouchableOpacity>
    </View>
    <Image style={{height:'16em',width:'100%',marginTop:'139%', position:'absolute',zIndex:'5'}} source={"https://media2.giphy.com/media/d9ZfjDBpd6oSxf6uyF/giphy.gif"}/>
</View>


);

}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Usuário">
        <Stack.Screen name="telaProfessor" component={HomeScreen} />        
        <Stack.Screen name="CadastrarProfessor" component={DetailsScreen} /> 
        <Stack.Screen name="ConsultaProfessor" component={BLA} />
        <Stack.Screen name="Usuário" component={Usuário} />        
        <Stack.Screen name="telaAluno" component={AlunoScreen} />       

        <Stack.Screen name="CadastroAluno" component={cadastroAluno}/>
        <Stack.Screen name="ConsultaAluno" component={ConsultaAluno}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}





const styles = StyleSheet.create({
  button:{
    color:'white',
    height:'5em',
    backgroundColor:'white',
    borderRadius:'10px',
    width:'20em',
    fontFamily:' arial, sans-serif',

  },
  boxButton:{
    display:'flex',
    flexDirection:'column',
    gap:'2em',
    alignItems:'center',
    marginTop:'50%',

  },
  textButtonStyle:{
    fontSize:'18pt',
    color:'black',
    fontWeight:'800',
    textAlign:'center',
    marginTop:'0.9em'
  },
  textButtonStyle1:{
    marginLeft:'3.1em',
    marginTop:'0.9em',
    fontWeight:'800',
    fontSize:'18pt',
  },
  textButtonStyle2:{
    fontWeight:'800',
    fontSize:'18pt',
    color:'white',
  },
  textButtonCard1:{
    fontWeight:'800',
    fontSize:'18pt',
    color:'white',
    marginLeft:"1.3em"
  },
  textButtonCard:{
    fontWeight:'800',
    fontSize:'18pt',
    color:'white',
    marginLeft:"0.3em"
  },
  imgButton:{
    height:'3em',
    width:'3em',
    marginTop:'1em',
    marginLeft:"0.5em"
  },
  rowButton:{
    display:'flex',
    flexDirection:'row',
  },
  background:{
    backgroundColor:'#459adc',
    height:'100%',
    width:'100%',
    alignItems:'center',
    borderRadius:'10px',
    alignItems:'center'
  },
  inptStyle:{
    height:'3em',
    width:'23em',
    color:'white',
    placeholderTextColor:'white',

    border:'solid #FFC80B 2px',
  },
  title:{
    fontSize:'18pt',
    color:'black',
    fontWeight:'800',
    textAlign:'center',
    color:'white',
  },
  listProf:{
    fontSize:'15pt',
    color:'black',
    marginTop:'1em',
    marginLeft:'20px',
    fontWeight:'bold'
 
  },
  columnButton:{
    display:'flex',
    flexDirection:'column',
  },
  imgButtonCard:{
    height:'8em',
    width:'8em',
  },
  imgButtonCard1:{
    height:'8em',
    width:'8em',
    marginTop:"em"
  },
  card:{
    height:'8em',
    width:'8em',
    backgroundColor:'white',
    borderRadius:'10px',
    alignItems:'center',
  },
  rowCards:{
    display:'flex',
    flexDirection:'row',
    gap:'3em',
    alignItems:'center',
    margin:'auto',
    marginTop:'100%'
  },
  telaInicialContainer:{
     backgroundColor:'#459adc',
     height:'100%'
  },
  cuboApresnt:{
    flex: 1, 
   
    justifyContent: 'center',
    backgroundColor:'white',
    borderRadius:'10px',
    marginTop:'30px',
    border:'2px solid black'
  }

});