const Tabela = require('./TabelaProduto')

class Produto {
    constructor ({id, titulo, preco, estoque, fornecedor, dataCriacao, dataAtualizacao, versao}) {
        this.id = id,
        this.titulo = titulo,
        this.preco = preco,
        this.estoque = estoque,
        this.fornecedor = fornecedor,
        this.dataCriacao = dataCriacao,
        this.dataAtualizacao = dataAtualizacao,
        this.versao = versao
    }

    async validar(){
        if(typeof this.titulo !== 'string' || this.titulo.length === 0){
            throw new Error('campo titulo inválido')
        }
        if(typeof this.preco !== 'number' || this.preco === 0){
            throw new Error('campo preco inválido')
        }
    }

    async criar(){
        this.validar()
        const resultado = await Tabela.inserir({
            titulo:this.titulo,
            preco: this.preco,
            estoque: this.estoque,
            fornecedor: this.fornecedor
        })
        this.id = resultado.id,
        this.dataCriacao = resultado.dataCriacao,
        this.dataAtualizacao = resultado.dataAtualizacao,
        this.versao = resultado.versao
    }

    async apagar(){
       return Tabela.remover(this.id, this.fornecedor);
    }
    
    async carregar(){
        const produto = Tabela.pegarPorId(this.id, this.fornecedor);
        this.titulo = produto.titulo,
        this.preco = produto.preco
        this.estoque = produto.estoque
        this.dataCriacao = produto.dataCriacao,
        this.dataAtualizacao = produto.dataAtualizacao,
        this.versao = produto.versao
    }
}

module.exports = Produto