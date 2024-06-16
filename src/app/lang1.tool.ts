
import { autocompletion, CompletionContext, CompletionResult } from '@codemirror/autocomplete';
import {syntaxTree,} from "@codemirror/language";
import {SyntaxNode} from "@lezer/common";
import {linter, Diagnostic} from "@codemirror/lint"
import { EditorView, basicSetup } from "codemirror";
import { EditorStateConfig, Text,EditorState } from "@codemirror/state";



const fatvals = ["code1", "code2", "code3"];
const prodfatvals = ["prodcode1", "prodcode2", "prodcode3"];
const getFatValsStrings = (vals: string[])=> vals.map( v => ({displayLabel: `"${v}"`, label: `"${v}"`, type:"String"}) )
const getFatValsSuggest = (vals: string[])=> vals.map( v => ({displayLabel: `fatval("${v}")`, label: `fatval("${v}")`, type:"Object"}) )


const getObjetNameByNode = (objNode: SyntaxNode|null, state: EditorState) => {
    if(objNode?.name!=="Object"){
        return null;
    }
    console.log({objNode});
    return getObjectName(objNode.firstChild, state);

}

const getObjectName =( objectNameNode: SyntaxNode|null, state: EditorState)=>{
    if(objectNameNode?.name!=="ObjectName"){
        return null
    }
    const objectName = state.sliceDoc(objectNameNode.from, objectNameNode.to);
    console.log({objectName});
    return objectName;
}

const getParentObject = (objectNode: SyntaxNode|null)=>{
    if(objectNode?.name!=="Object"){
        return null;
    }
    const objectSeparatorNode = objectNode.prevSibling;
    if(objectSeparatorNode?.name!=="ObjectSeparator"){
        return null;
    }
    const objectParentNode = objectSeparatorNode?.prevSibling;
    if(objectSeparatorNode.prevSibling?.name!=="Object"){
        return null;
    }
    return objectParentNode;
    
}
 

export function handleSuggestLang1(context: CompletionContext): CompletionResult|null {
    const syntaxTreeInstance = syntaxTree(context.state);
    const nodeBefore = syntaxTreeInstance.resolveInner(context.pos, -1);
    const name = nodeBefore.name;
    const v = context.state.sliceDoc(nodeBefore.from, nodeBefore.to)
    const firstChild = nodeBefore.firstChild;
    const parent = nodeBefore.parent;
    const prevSibling = nodeBefore.prevSibling;

    console.log("nodeBefore",{ name, v, firstChild, prevSibling, parent});
    
    if(name=="ObjectName") {
        
        const objectName = context.state.sliceDoc(nodeBefore.from, nodeBefore.to);
        if(objectName=="fatval"){
            let objectParentName: string| null = null;
            if(parent){
                console.log({parent}, parent.prevSibling);
                if(parent.prevSibling?.name=="ObjectSeparator"){
                    objectParentName = getObjetNameByNode(parent.prevSibling.prevSibling, context.state);
                    
                }
            }
            console.log({objectParentName});
            
            return {
                from: nodeBefore.from,
                options: getFatValsSuggest(objectParentName=="prd"? prodfatvals: fatvals)
            }
        }

    }
    else if(name=="ObjectSeparator") {
        const objectName = getObjetNameByNode(prevSibling, context.state);
        if(objectName=="prd"){
            return {
                from: context.pos,
                options: getFatValsSuggest(prodfatvals)
            }
        }
    }else if(name=="Object"){
        const objectName = getObjetNameByNode(nodeBefore, context.state)

        if(objectName=="fatval"){
            return {
                from: context.pos,
                options: [

                    {displayLabel:"=", label:"=", type: "Operator"},
                    {displayLabel:">", label:">", type: "Operator"},
                    {displayLabel:"<", label:"<", type: "Operator"},
                    {displayLabel:"<=", label:"<=", type: "Operator"},
                    {displayLabel:">=" , label:">=", type: "Operator"},
                    {displayLabel:"+" , label:"+", type: "Operator"},
                    {displayLabel:"-", label:"-", type: "Operator"},
                    {displayLabel:"*", label:"*", type: "Operator"},
                    {displayLabel:"/" , label:"/", type: "Operator"},
                    {displayLabel:"|" , label: "|", type: "Operator"},
                    {displayLabel:"!", label:"!", type: "Operator"},
                    {displayLabel:"&", label:"&", type: "Operator"},
                    {displayLabel:"<>", label:"<>", type: "Operator"},
                ]
            }
        }
       
    }else if(name=="String"){
        const argNode = parent;
        if(argNode?.name=="Arg"){
            console.log("Arg", {argNode});
            const argsNode = argNode?.parent;
            console.log("Args", {argsNode});
            

            if(argsNode?.name=="Args"){
   
                const objectName = getObjetNameByNode(argsNode.parent, context.state);
                if(objectName=="fatval") {
                    const r =  {
                        from: argNode.from,
                        to: argNode.to,
                        options: getFatValsStrings(fatvals)
                    }
                    console.log({r})

                    return r;
                }

            }
        }
    }else if(name=="Operator"){
        return {
                from: context.pos,
                options: [
                    {label:"prd()", displayLabel: "prd()", type: "Object"},
                    ...getFatValsSuggest(fatvals)
                ]
            }
    }else if( (/^"/).test(v) ) {
        console.log("incomplete string");
        const objectName = getObjetNameByNode(parent, context.state);
        if(objectName=="fatval"){

            const r = {
                from: nodeBefore.from,
                to: nodeBefore.to,
                options:  getFatValsStrings(fatvals)
            }
            console.log({r})
            return r;

        }
    }else if(prevSibling){
        console.log({prevSibling});

        if(prevSibling.name=="ObjectSeparator"){
            const objectParentName = getObjetNameByNode(prevSibling.prevSibling, context.state);
            console.log("====>", {objectParentNode: objectParentName}, prevSibling.prevSibling);
            if("fatval".search(v)>-1){
                const r = {
                    from: nodeBefore.from,
                    to: nodeBefore.to,
                    options: getFatValsSuggest(objectParentName=="prd"? prodfatvals: fatvals)
                }
                console.log("return ...", r);
                return r;
            }
        }else if(prevSibling.name=="Operator"){
            const objectMatch = v.search(/prd|fatval/);
            
            if(objectMatch){
                return {
                    from: nodeBefore.from,
                    to: nodeBefore.to,
                    options: [
                        {label:"prd()", displayLabel: "prd()", type: "Object"},
                        ...getFatValsSuggest(fatvals)
                    ]
                }
            }
        }

    }else {
        console.log("else");
        return {
            from: nodeBefore.from,
            options: [
                {label:"prd()", displayLabel: "prd()", type: "Object"},
                ...getFatValsSuggest(fatvals)
            ]
        }
    }

    return null;
}


export function Lang1Linter(view:EditorView) {
    let diagnostics: Diagnostic[] = [];
    const topNode = syntaxTree(view.state).topNode
    const tree = topNode.toTree();
    // console.log("Lang1Linter",{topNode, tree}, );
    function traverse(node: SyntaxNode, parent: SyntaxNode|null) {
        // console.log("Lang1Linter:", {node}, node.type.name);

        if(node.type.name=="Object"){
            const objectName = getObjetNameByNode(node, view.state);
            

            const nextSibling = node.nextSibling;
            const expr = view.state.sliceDoc(node.from, node.to);

            console.log("Lang1Linter:",{node, objectName,nextSibling, expr});

            if(objectName=="prd" && nextSibling?.type.name!=="ObjectSeparator"){
                diagnostics.push({
                    from: node.from,
                    to: node.to,
                    severity: "error",
                    message: "Expected child object (for example fatval)"
                });
            }else if(objectName=="fatval" ){
                const bo =view.state.doc.slice(node.to, node.to+1).toString();
                console.log("Lang1Linter: fatval!", {bo}, view.state.doc.toString())
                const v = nextSibling ? view.state.sliceDoc(nextSibling.from, nextSibling.to) : "";
                if(nextSibling?.type.name=="ObjectSeparator" || v=="." || bo=="."){
                    console.log("Lang1Linter: fatval! errore????");
                    diagnostics.push({
                        from: node.from,
                        to: node.to,
                        severity: "error",
                        message: `Unexpected separator, fatval non has child object` 
                    });
                }
                
            }
        }
    
        // Attraversa i figli del nodo corrente
        for (let child = node.firstChild; child; child = child.nextSibling) {
            traverse(child, node);
        }
    }
    
        // Inizia l'attraversamento dell'albero di sintassi a partire dalla radice
    traverse(tree.topNode, null);

    // console.log("Lang1Linter",{diagnostics})
    return diagnostics;
}


