'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lr = require('@lezer/lr');
var language = require('@codemirror/language');
var highlight = require('@lezer/highlight');

// This file was generated by lezer-generator. You probably shouldn't edit it.
const parser = lr.LRParser.deserialize({
  version: 14,
  states: "$hQVQPOOObQPO'#CdOgQPO'#CiOxQPO'#C^O}QPO'#CnOOQO'#Cn'#CnQVQPOOO!iQPO,59OOVQPO,59QO!iQPO,58xO]QPO,59^OOQO-E6g-E6gO!wQPO1G.jO!|QPO'#CfOOQO'#Ca'#CaO#RQPO'#CaO#^QPO'#CaO#lQPO'#C`OOQO1G.l1G.lO#qQPO1G.dOOQO1G.x1G.xOOQO7+$U7+$UO!iQPO'#CjO#vQPO,58zOOQO7+$O7+$OOOQO,59U,59UOOQO-E6h-E6h",
  stateData: "$O~OaOS~ORROVTOXPO~OcVO~OZWOR]XV]XX]X_]X~OcXO~O[YORbXVbXXbXZbX_bXebXdbX~ORROU^OV_OXPO~OdeO~OZWO~OZbXeTXdTX~O[YOZbXeTXdTX~OefO~OdhO~OefOdSa~O",
  goto: "#OgPPhPrxPP!PPhPP!^!dPPP!jPPP!vUTOUWV_VXfQ[VRcXSaVXRifUSOUWU`VXfRdYQUORZUQgaRjgSQOUU]VXfRbW]TOUVWXf",
  nodeNames: "⚠ Program Function FunctionName Args Arg String Number Object ObjectName BinaryExpression Operator ObjectSeparator",
  maxTerm: 22,
  skippedNodes: [0],
  repeatNodeCount: 2,
  tokenData: "0R~RrXY#]YZ#]]^#]pq#]qr#nrs#svw#nxy$qyz$vz{#n{|#n|}${}!O#n!O!P%Q!P!Q#n!Q![%V!^!_%_!_!`#n!`!a%j!c!d%r!g!h&T!h!i&a!k!l&v!n!o']!o!p'l!s!t(U!t!u(j#W#X)R#Y#Z-Y#a#b-}#c#d/]#d#e/c#m#n/o#p#q#n~#bSa~XY#]YZ#]]^#]pq#]~#sOZ~~#vT}!O$V!Q![$V!c!}$V#R#S$V#T#o$V~$YUrs$l}!O$V!Q![$V!c!}$V#R#S$V#T#o$V~$qOU~~$vOc~~${Od~~%QOe~~%VO[~~%[PV~!Q![%V~%dQZ~!_!`#n!`!a#n~%oPZ~!_!`#n~%uP!d!e%x~%{P!u!v&O~&TOR~~&WP!z!{&Z~&^P!r!s&O~&dQ!k!l&j!q!r&p~&mP!z!{&O~&sP!t!u&O~&yQ!k!l'P!p!q'V~'SP!h!i&O~'YP!v!w&O~'`Q!p!q&O!q!r'f~'iP!i!j&O~'oR!c!d&j!k!l'x!q!r(O~'{P!p!q&O~(RP!f!g&O~(XP!t!u([~(_P!{!|(b~(gPR~!u!v&O~(mP!p!q(p~(sP!f!g(v~({QR~!f!g&O!g!h&O~)US#T#U)b#W#X*t#]#^+^#c#d-S~)eQ#h#i)k#m#n&O~)nP#X#Y)q~)vQR~#T#U)|#W#X*b~*PP#W#X*S~*VP#W#X*Y~*_PR~#k#l&O~*eP#]#^*h~*kP#Y#Z*n~*qP#Y#Z&O~*wP#k#l*z~*}P#X#Y+Q~+TP#X#Y+W~+ZP#_#`&O~+aP#Y#Z+d~+gP#Y#Z+j~+mR#W#X+v#a#b,b#m#n,h~+yP#W#X+|~,RPR~!T!U,U~,XP!W!X,[~,_P!Q!R&O~,eP#a#b&O~,kP#m#n,n~,sPR~#W#X,v~,yP#X#Y,|~-PP#V#W&O~-VP#k#l&O~-]P#T#U-`~-cP#h#i-f~-iP#j#k-l~-oP#T#U-r~-uP#`#a-x~-}OX~~.QQ#T#U.W#c#d.y~.ZP#_#`.^~.aP#X#Y.d~.gQ#b#c.m#k#l&O~.pP#T#U.s~.vP#j#k&O~.|P#b#c/P~/SP#h#i/V~/YP#[#]&O~/`P#d#e-x~/fP#f#g/i~/lP#W#X-x~/rP#X#Y/u~/xP#T#U/{~0OP#f#g&O",
  tokenizers: [0],
  topRules: {"Program":[0,1]},
  tokenPrec: 0
});

const Lang1Language = language.LRLanguage.define({
    parser: parser.configure({
        props: [
            language.indentNodeProp.add({
                Application: language.delimitedIndent({ closing: ")", align: false })
            }),
            language.foldNodeProp.add({
                Application: language.foldInside
            }),
            highlight.styleTags({
                // Identifier: t.variableName,
                // Boolean: t.bool,
                String: highlight.tags.string,
                ObjectName: highlight.tags.className,
                FunctionName: highlight.tags.keyword,
                LineComment: highlight.tags.lineComment,
                ObjectSeparator: highlight.tags.separator,
                Operator: highlight.tags.operator,
                Invalid: highlight.tags.invalid,
                "( )": highlight.tags.paren
            })
        ]
    }),
    languageData: {
        commentTokens: { line: ";" }
    }
});
function Lang1() {
    return new language.LanguageSupport(Lang1Language);
}

exports.Lang1 = Lang1;
exports.Lang1Language = Lang1Language;
