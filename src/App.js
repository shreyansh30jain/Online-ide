import React, { Component } from 'react'
import axios from 'axios';


export default class App extends Component {
    state={
        text: ''
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        var code = document.getElementById('code').textContent
        var lang = document.getElementById('lang').value
        var input = document.getElementById('input').textContent
        var language
        //var output
        if(lang === 'c++') {
          language = 'cpp'
        }
        else if(lang === 'c') {
          language = 'c'
        }
        else if(lang === 'java') {
          language = 'java'
        }
        else {
          language = 'py'
        }
        var data = JSON.stringify({
          "code": `${code}`,
          "language": `${language}`,
          "input": `${input}`
        })
        
        var config = {
          method: 'post',
          url: 'http://localhost:8000',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
            
            console.log(response.data)
            document.getElementById('result').innerText = response.data['output']
        })
        .catch(function (error) {
          console.log(error);
        });
  }

    onCodeChangeHandler = (e) => {
        this.setState({
            code: e.target.value
        })
    }
    onInputChangeHandler = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    render() {
       console.log(this.state)
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-12 mt-5">
                        <select id="lang" onChange={(e) => this.setState({ lang: e.target.value })}>
                            <option value="c++">C++</option>
                            <option value="c">C</option>
                            <option value="java">Java</option>
                            <option value="python">Python</option>
                        </select>
                             <p className="lead d-block my-0">Code your code here</p>
                             <textarea type="text" id="code" value={this.state.code} onChange={this.onCodeChangeHandler}>
                             </textarea>
                        </div>
                        <div className="col-12 mt-3">
                            <p className="lead d-block my-0">Provide Input</p>
                             <textarea type="text" id="input" value={this.state.input} onChange={this.onInputChangeHandler}>
                             </textarea>
                        </div>
                    </div>
                    <button className="btn btn-success" onClick={event => this.onSubmitHandler(event)}>Submit Code</button>
                    <div className="row">
                        <div className="col-12 my-5">
                             <textarea type="text" id="result" value={this.state.result} disabled={true}>
                             </textarea>
                        </div>
                    </div>
                </div>
            </>
        )
    }
  }
