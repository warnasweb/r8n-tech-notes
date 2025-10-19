import type { K8sItem } from "@/components/k8s-data"
import { k8sItems } from "@/components/k8s-data"

const dockerIcons = {
  container: "M4 6h16v12H4V6zm2 2v8h12V8H6z",
  image: "M4 6h16v12H4V6zm3 3l3 4 2-2 4 5H6V9z",
  dockerfile: "M6 4h12v16H6V4zm2 2v12h8V6H8zm2 2h4v2h-4V8zm0 4h4v2h-4v-2z",
  engine: "M5 5h14v4H5V5zm0 6h14v8H5v-8zm6-4h2v2h-2V7zm0 6h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2z",
  runtime: "M6 4h12l2 4-2 4H6L4 8l2-4zm1 2l-1 2 1 2h10l1-2-1-2H7zm-1 8h10v6H6v-6zm2 2v2h6v-2H8z",
  volume: "M12 4l8 4v8l-8 4-8-4V8l8-4zm0 2.2L6 9v6l6 2.8 6-2.8V9l-6-2.8z",
  network: "M12 4a8 8 0 100 16 8 8 0 000-16zm-1 3h2v4h4v2h-4v4h-2v-4H7v-2h4V7z",
  compose: "M4 10h7V6h2v4h7v2h-7v4h-2v-4H4z",
} as const

const restIcons = {
  logo:
    "M9.8 5.2a4.5 4.5 0 018.594 1.637A4 4 0 0118 15H7a4 4 0 01-.7-7.94 4.502 4.502 0 013.5-1.86zm0 1.5a3 3 0 00-2.553 1.422l-.23.373-.43.046A2.5 2.5 0 007 13.5h11a2.5 2.5 0 001.162-4.704l-.543-.273.185-.588a3 3 0 00-5.16-2.848l-.29.352-.45-.067A3 3 0 009.8 6.7zm2.2 2.05a.75.75 0 01.75.75v.75h.75a.75.75 0 010 1.5H12.75v2.25a.75.75 0 11-1.5 0V11.75H10.5a.75.75 0 010-1.5h.75v-.75a.75.75 0 01.75-.75zm4.25-.2a1 1 0 11-2 0 1 1 0 012 0zM9 17.5h6a1 1 0 010 2H9a1 1 0 010-2zm1.5 2.75h3a1 1 0 010 2h-3a1 1 0 010-2z",
  openapi:
    "M21.039 0a2.959 2.959 0 00-2.65 4.274l-6.447 6.447a2.96 2.96 0 101.335 1.336l6.447-6.447A2.959 2.959 0 1021.04 0zM10.628 2.745c-.072 0-.143.003-.214.004-.072.002-.143.002-.215.005-.447.018-.893.064-1.335.138l-.03.005-.185.033-.105.02a7.718 7.718 0 00-.289.062l-.032.008a10.69 10.69 0 00-2.55.95l-.155.089c-.063.034-.125.07-.187.105-.046.027-.093.051-.14.079H5.19l-.01.005-.036.02v.002l.111.184 3.15 5.23a4.168 4.168 0 01.38-.202 4.294 4.294 0 011.628-.413c.071-.004.143-.008.214-.008zm.428.01v6.333c.325.034.647.103.96.209l4.66-4.66c-.173-.12-.348-.237-.528-.347l-.026-.015c-.056-.035-.112-.067-.168-.1l-.098-.056-.099-.055a12.735 12.735 0 00-.171-.092l-.027-.014a10.628 10.628 0 00-1.425-.617c-.69-.241-1.403-.41-2.128-.505l-.089-.012-.09-.01a6.56 6.56 0 00-.17-.019l-.049-.004-.204-.017a6.44 6.44 0 00-.255-.015c-.031-.003-.062-.003-.093-.004zM4.782 4.498a9.92 9.92 0 00-1.36 1.062l4.461 4.461.018.018c.049-.04.098-.078.149-.116l-.011-.018zm-1.67 1.36c-.05.05-.098.103-.147.154l-.149.155c-.33.357-.63.73-.902 1.118l-.039.056a10.588 10.588 0 00-.216.326 10.6 10.6 0 00-1.65 5.276l-.006.215-.003.214h6.317c0-.072.007-.143.01-.214.005-.072.006-.144.013-.215.081-.822.399-1.625.952-2.3.045-.055.096-.106.144-.16.048-.052.093-.107.144-.158zm16.255 1.464l-4.663 4.663c.106.312.175.634.21.959h6.332l-.004-.094a11.579 11.579 0 00-.032-.456l-.005-.052a13.044 13.044 0 00-.026-.241v-.009l-.033-.24v-.009a10.618 10.618 0 00-.327-1.493l-.003-.01a15.839 15.839 0 00-.07-.228l-.01-.03a14.111 14.111 0 00-.069-.204l-.02-.055a5.65 5.65 0 00-.153-.405 7.84 7.84 0 00-.093-.227 16.67 16.67 0 00-.063-.144l-.037-.081a13.776 13.776 0 00-.08-.171l-.024-.052-.096-.194-.014-.027a11.2 11.2 0 00-.112-.212l-.004-.008a10.615 10.615 0 00-.604-.98zm-4.43 6.05c0 .071-.006.142-.01.214-.003.072-.005.143-.012.214a4.29 4.29 0 01-.952 2.301c-.045.055-.096.107-.144.16-.048.053-.093.108-.144.159l4.467 4.467c.051-.051.099-.104.148-.155.05-.052.1-.103.148-.155.331-.358.633-.733.905-1.122l.032-.046.098-.144.085-.13.04-.063a10.597 10.597 0 001.647-5.272c.003-.071.004-.143.006-.214.001-.071.004-.143.004-.214zM.01 13.8l.004.093.01.179.005.076.017.206.005.046c.007.076.015.153.024.228l.003.022a9.605 9.605 0 00.033.248c.072.505.182 1.005.327 1.497l.002.006c.022.077.047.154.071.23l.004.014.005.014a15.737 15.737 0 00.153.439l.03.08.059.148a7.702 7.702 0 00.093.228l.062.14.038.084.078.169.027.054a10.677 10.677 0 00.225.441l.025.043 5.408-3.258.02-.012a4.314 4.314 0 01-.395-1.414h-.025zm.505 2.846l-.206.058.002.005zm6.425-1.052l-5.415 3.262c.083.139.17.273.259.406l.008.014.004.005.008.014h.001c.007.012.014.022.022.032l.001.002v.001a10.634 10.634 0 00.298.417l.006.008a9.963 9.963 0 00.29.368l.033.04c.043.052.086.103.13.153l.057.065.112.127.064.069.029.031.083.09.035.035c.049.051.098.103.149.153L7.58 16.42a3.86 3.86 0 01-.285-.321 4.422 4.422 0 01-.356-.505zm4.951.003l-.015.015-4.46 4.46a8.966 8.966 0 00.195.176c.022.02.043.04.065.058l.152.13a10.622 10.622 0 00.215.174l.023.017.191.148.008.005c.268.2.547.389.834.564l.03.018.164.097.101.057a5.458 5.458 0 00.27.148c.008.004.016.01.025.013.162.085.327.164.493.24l.158-.385 2.243-5.448.009-.02a4.328 4.328 0 01-.701-.467zm4.951.353c-.061.037-.124.07-.187.104a4.318 4.318 0 01-3.271.336c-.069-.02-.135-.047-.203-.071-.067-.024-.136-.044-.202-.072l-2.242 5.444-.088.213-.075.183v.001l.017.007a.137.137 0 00.019.007l.005.003c.052.021.106.04.159.06.067.027.133.053.2.077l.102.04c.702.247 1.43.42 2.168.518l.087.012.09.01.172.019a7.173 7.173 0 00.252.022c.023.001.048.001.071.003l.184.011.112.005a7.06 7.06 0 00.358.007h.05a10.667 10.667 0 001.793-.15l.185-.034.105-.02.109-.023.18-.04.032-.008a10.684 10.684 0 002.55-.95c.052-.028.104-.06.156-.089.063-.034.125-.07.187-.105.043-.024.087-.047.13-.073h.001l.002-.002.002-.001.002-.001.007-.004.042-.025-.11-.183-.11-.184zm3.262 5.414l-.042.025.042-.024zm-.05.029zm-.005.004h-.002z",
  postman:
    "M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.072.072 0 0 1 .013-.093zm-3.646 6.058a.076.076 0 0 1-.069-.083.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.425-1.256a.228.228 0 0 0-.117.256l.203.865a.125.125 0 0 1-.211.117h-.003l-.934-.934-.294-.295 3.762-3.758 1.82-.393.874.874c-1.255 1.102-2.971 2.201-5.1 3.268zm5.279-3.428h-.002l-.839-.839 4.699-4.125a.952.952 0 0 0 .119-.127c-.148 1.345-2.029 3.245-3.977 5.091zm3.657-6.46l-.003-.002a1.822 1.822 0 0 1 2.459-2.684l-1.61 1.613a.119.119 0 0 0 0 .169l1.247 1.247a1.817 1.817 0 0 1-2.093-.343zm2.578 0a1.714 1.714 0 0 1-.271.218h-.001l-1.207-1.207 1.533-1.533c.661.72.637 1.832-.054 2.522zM18.855 6.05a.143.143 0 0 0-.053.157.416.416 0 0 1-.053.45.14.14 0 0 0 .023.197.141.141 0 0 0 .084.03.14.14 0 0 0 .106-.05.691.691 0 0 0 .087-.751.138.138 0 0 0-.194-.033z",
  swagger:
    "M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12c6.616 0 12-5.383 12-12S18.616 0 12 0zm0 1.144c5.995 0 10.856 4.86 10.856 10.856 0 5.995-4.86 10.856-10.856 10.856-5.996 0-10.856-4.86-10.856-10.856C1.144 6.004 6.004 1.144 12 1.144zM8.37 5.868a6.707 6.707 0 0 0-.423.005c-.983.056-1.573.517-1.735 1.472-.115.665-.096 1.348-.143 2.017-.013.35-.05.697-.115 1.038-.134.609-.397.798-1.016.83a2.65 2.65 0 0 0-.244.042v1.463c1.126.055 1.278.452 1.37 1.629.033.429-.013.858.015 1.287.018.406.073.808.156 1.2.259 1.075 1.307 1.435 2.575 1.218v-1.283c-.203 0-.383.005-.558 0-.43-.013-.591-.12-.632-.535-.056-.535-.042-1.08-.075-1.62-.064-1.001-.175-1.988-1.153-2.625.503-.37.868-.812.983-1.398.083-.41.134-.821.166-1.237.028-.415-.023-.84.014-1.25.06-.665.102-.937.9-.91.12 0 .235-.017.369-.027v-1.31c-.16 0-.31-.004-.454-.006zm7.593.009a4.247 4.247 0 0 0-.813.06v1.274c.245 0 .434 0 .623.005.328.004.577.13.61.494.032.332.031.669.064 1.006.065.669.101 1.347.217 2.007.102.544.475.95.941 1.283-.817.549-1.057 1.333-1.098 2.215-.023.604-.037 1.213-.069 1.822-.028.554-.222.734-.78.748-.157.004-.31.018-.484.028v1.305c.327 0 .627.019.927 0 .932-.055 1.495-.507 1.68-1.412.078-.498.124-1 .138-1.504.032-.461.028-.927.074-1.384.069-.715.397-1.01 1.112-1.057a.972.972 0 0 0 .199-.046v-1.463c-.12-.014-.204-.027-.291-.032-.536-.023-.804-.203-.937-.71a5.146 5.146 0 0 1-.152-.993c-.037-.618-.033-1.241-.074-1.86-.08-1.192-.794-1.753-1.887-1.786zm-6.89 5.28a.844.844 0 0 0-.083 1.684h.055a.83.83 0 0 0 .877-.78v-.046a.845.845 0 0 0-.83-.858zm2.911 0a.808.808 0 0 0-.834.78c0 .027 0 .05.004.078 0 .503.342.826.859.826.507 0 .826-.332.826-.853-.005-.503-.342-.836-.855-.831zm2.963 0a.861.861 0 0 0-.876.835c0 .47.378.849.849.849h.009c.425.074.853-.337.881-.83.023-.457-.392-.854-.863-.854z",
} as const

const aiIcons = {
  ml: "M12 3l6 4v10l-6 4-6-4V7l6-4zm0 2.3L8 7.5v7l4 2.7 4-2.7v-7l-4-2.2z",
  dl: "M6 6h12v2H6V6zm0 4h12v2H6v-2zm0 4h12v2H6v-2z",
  nlp: "M5 5h14v10H8l-3 3V5zm2 2v6h10V7H7z",
  cv: "M12 5a7 7 0 100 14 7 7 0 000-14zm0 2a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z",
  pipeline: "M4 7h16v2H4V7zm0 4h16v2H4v-2zm0 4h16v2H4v-2z",
  mlops: "M12 4l1.5 2.6 3-.4-.4 3 2.5 1.5-2.5 1.5.4 3-3-.4L12 20l-1.5-2.6-3 .4.4-3L5.4 12l2.5-1.5-.4-3 3 .4L12 4zm0 4.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z",
} as const

const kubernetesLogo = `M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.143 5.143 0 0 0-.73 3.255l2.514-.725.002-.009zm1.145-1.98a.44.44 0 0 0 .699-.337l.01-.005.15-2.62a5.144 5.144 0 0 0-3.01 1.442l2.147 1.523.004-.002zm.76 2.75l.723.349.722-.347.18-.78-.5-.623h-.804l-.5.623.179.779zm1.5-3.095a.44.44 0 0 0 .7.336l.008.003 2.134-1.513a5.188 5.188 0 0 0-2.992-1.442l.148 2.615.002.001zm10.876 5.97l-5.773 7.181a1.6 1.6 0 0 1-1.248.594l-9.261.003a1.6 1.6 0 0 1-1.247-.596l-5.776-7.18a1.583 1.583 0 0 1-.307-1.34L2.1 5.573c.108-.47.425-.864.863-1.073L11.305.513a1.606 1.606 0 0 1 1.385 0l8.345 3.985c.438.209.755.604.863 1.073l2.062 8.955c.108.47-.005.963-.308 1.34zm-3.289-2.057c-.042-.01-.103-.026-.145-.034-.174-.033-.315-.025-.479-.038-.35-.037-.638-.067-.895-.148-.105-.04-.18-.165-.216-.216l-.201-.059a6.45 6.45 0 0 0-.105-2.332 6.465 6.465 0 0 0-.936-2.163c.052-.047.15-.133.177-.159.008-.09.001-.183.094-.282.197-.185.444-.338.743-.522.142-.084.273-.137.415-.242.032-.024.076-.062.11-.089.24-.191.295-.52.123-.736-.172-.216-.506-.236-.745-.045-.034.027-.08.062-.111.088-.134.116-.217.23-.33.35-.246.25-.45.458-.673.609-.097.056-.239.037-.303.033l-.19.135a6.545 6.545 0 0 0-4.146-2.003l-.012-.223c-.065-.062-.143-.115-.163-.25-.022-.268.015-.557.057-.905.023-.163.061-.298.068-.475.001-.04-.001-.099-.001-.142 0-.306-.224-.555-.5-.555-.275 0-.499.249-.499.555l.001.014c0 .041-.002.092 0 .128.006.177.044.312.067.475.042.348.078.637.056.906a.545.545 0 0 1-.162.258l-.012.211a6.424 6.424 0 0 0-4.166 2.003 8.373 8.373 0 0 1-.18-.128c-.09.012-.18.04-.297-.029-.223-.15-.427-.358-.673-.608-.113-.12-.195-.234-.329-.349-.03-.026-.077-.062-.111-.088a.594.594 0 0 0-.348-.132.481.481 0 0 0-.398.176c-.172.216-.117.546.123.737l.007.005.104.083c.142.105.272.159.414.242.299.185.546.338.743.522.076.082.09.226.1.288l.16.143a6.462 6.462 0 0 0-1.02 4.506l-.208.06c-.055.072-.133.184-.215.217-.257.081-.546.11-.895.147-.164.014-.305.006-.48.039-.037.007-.09.02-.133.03l-.004.002-.007.002c-.295.071-.484.342-.423.608.061.267.349.429.645.365l.007-.001.01-.003.129-.029c.17-.046.294-.113.448-.172.33-.118.604-.217.87-.256.112-.009.23.069.288.101l.217-.037a6.5 6.5 0 0 0 2.88 3.596l-.09.218c.033.084.069.199.044.282-.097.252-.263.517-.452.813-.091.136-.185.242-.268.399-.02.037-.045.095-.064.134-.128.275-.034.591.213.71.248.12.556-.007.69-.282v-.002c.02-.039.046-.09.062-.127.07-.162.094-.301.144-.458.132-.332.205-.68.387-.897.05-.06.13-.082.215-.105l.113-.205a6.453 6.453 0 0 0 4.609.012l.106.192c.086.028.18.042.256.155.136.232.229.507.342.84.05.156.074.295.145.457.016.037.043.09.062.129.133.276.442.402.69.282.247-.118.341-.435.213-.71-.02-.039-.045-.096-.065-.134-.083-.156-.177-.261-.268-.398-.19-.296-.346-.541-.443-.793-.04-.13.007-.21.038-.294-.018-.022-.059-.144-.083-.202a6.499 6.499 0 0 0 2.88-3.622c.064.01.176.03.213.038.075-.05.144-.114.28-.104.266.039.54.138.87.256.154.06.277.128.448.173.036.01.088.019.13.028l.009.003.007.001c.297.064.584-.098.645-.365.06-.266-.128-.537-.423-.608zM16.4 9.701l-1.95 1.746v.005a.44.44 0 0 0 .173.757l.003.01 2.526.728a5.199 5.199 0 0 0-.108-1.674A5.208 5.208 0 0 0 16.4 9.7zm-4.013 5.325a.437.437 0 0 0-.404-.232.44.44 0 0 0-.372.233h-.002l-1.268 2.292a5.164 5.164 0 0 0 3.326.003l-1.27-2.296h-.01zm1.888-1.293a.44.44 0 0 0-.27.036.44.44 0 0 0-.214.572l-.003.004 1.01 2.438a5.15 5.15 0 0 0 2.081-2.615l-2.6-.44-.004.005z`

const dockerLogo = `M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z`

const aiLogo = `M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z`

const dockerItems: K8sItem[] = [
  {
    key: "dockerfile",
    title: "Dockerfile",
    blurb: "Declarative recipe for building images.",
    details: "Dockerfiles define instructions that assemble layers to produce a final image.",
    snippet: `FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nCMD ["npm","start"]`,
    icon: dockerIcons.dockerfile,
  },
  {
    key: "image",
    title: "Image",
    blurb: "Immutable template used to create containers.",
    details: "Images capture application code, dependencies, and metadata. Built once and run many times.",
    snippet: "docker build -t demo-app .\ndocker push demo-app",
    icon: dockerIcons.image,
  },
  {
    key: "engine",
    title: "Docker Engine",
    blurb: "Background daemon and APIs that manage containers.",
    details: "Docker Engine exposes REST APIs, runs dockerd, and coordinates container lifecycle through containerd/runc.",
    snippet: "sudo systemctl start docker\nsudo systemctl status docker",
    icon: dockerIcons.engine,
  },
  {
    key: "container",
    title: "Container",
    blurb: "Lightweight runtime instance of an image.",
    details: "A container packages application code with its runtime so it runs the same everywhere.",
    snippet: "docker run --rm -it nginx:1.25",
    icon: dockerIcons.container,
  },
  {
    key: "runtime",
    title: "Runtime",
    blurb: "Executes containers on the host OS.",
    details: "Runtime layers like containerd + runc interface with the kernel to provide namespaces, cgroups, and image unpacking.",
    snippet: "docker ps --format '{{.Image}} -> {{.Status}}'\ncrictl ps",
    icon: dockerIcons.runtime,
  },
  {
    key: "volume",
    title: "Volume",
    blurb: "Persistent data shared with containers.",
    details: "Volumes live on the host and can be mounted into containers for stateful workloads.",
    snippet: "docker volume create data-store\ndocker run -v data-store:/var/lib/app postgres:16",
    icon: dockerIcons.volume,
  },
  {
    key: "network",
    title: "Network",
    blurb: "Virtual network that connects containers.",
    details: "User-defined networks let containers discover and talk to each other by name.",
    snippet: "docker network create app-net\ndocker run --network app-net redis:7",
    icon: dockerIcons.network,
  },
  {
    key: "compose",
    title: "Docker Compose",
    blurb: "Multi-container workflows described as code.",
    details: "Compose files define services, networks, and volumes to spin up local environments quickly.",
    snippet: `services:\n  api:\n    build: .\n    ports:\n      - "3000:3000"\n  db:\n    image: postgres:16\n    volumes:\n      - pgdata:/var/lib/postgresql/data\nvolumes:\n  pgdata: {}`,
    icon: dockerIcons.compose,
  },
]

const restApiItems: K8sItem[] = [
  {
    key: "domain-driven",
    title: "Model the Domain",
    blurb: "Let resource relationships shape nested URLs.",
    details: "Design endpoints around business aggregates, not database tables. Use nesting to express ownership like /orders/{id}/items.",
    snippet: "GET /orders/{orderId}/items\nPOST /orders/{orderId}/items",
    icon: restIcons.openapi,
    href: "/rest-api",
  },
  {
    key: "verbs",
    title: "HTTP Verbs",
    blurb: "Use standard methods to signal intent.",
    details: "GET for retrieval, POST for creation, PUT/PATCH for updates, and DELETE for removal. Avoid RPC-style verb names in URLs.",
    snippet: "GET /v1/users\nPOST /v1/users\nPATCH /v1/users/{id}",
    icon: restIcons.postman,
    href: "/rest-api",
  },
  {
    key: "idempotence",
    title: "Idempotence",
    blurb: "Design repeatable calls that don't surprise clients.",
    details: "Non-mutating verbs are inherently idempotent. For POST, support idempotency keys or retries without duplicate effects.",
    snippet: "POST /payments (Idempotency-Key: abc123)",
    icon: restIcons.swagger,
    href: "/rest-api",
  },
  {
    key: "status-codes",
    title: "Status Codes",
    blurb: "Pick the code that best represents the outcome.",
    details: "Favor 200/201 for success. Use 400-level codes for client issues and 500-level for server-side problems with actionable messages.",
    snippet: "201 Created\n400 Bad Request\n409 Conflict",
    icon: restIcons.openapi,
    href: "/rest-api",
  },
  {
    key: "versioning",
    title: "Versioning Strategy",
    blurb: "Expose breaking changes via path, query, or headers.",
    details: "A consistent version strategy avoids surprises. Many teams prefer URI versioning like /v1/... with deprecation plans.",
    snippet: "GET /v1/users\nGET /v2/users",
    icon: restIcons.postman,
    href: "/rest-api",
  },
  {
    key: "batch",
    title: "Batch Operations",
    blurb: "Support high-volume workflows gracefully.",
    details: "Offer bulk endpoints and clearly document transactional behavior for arrays of creates, updates, or deletes.",
    snippet: "POST /v1/users/batch\n{\n  \"users\": [{\"email\": \"a@x.com\"}]\n}",
    icon: restIcons.swagger,
    href: "/rest-api",
  },
  {
    key: "query",
    title: "Query Language",
    blurb: "Allow filtering, sorting, and pagination idiomatically.",
    details: "Structured query params keep APIs discoverable. Document supported operators like eq, gte, match, sort, and page/size.",
    snippet: "GET /v1/users?match=name:ana&sort=createdAt.desc&page=1&size=25",
    icon: restIcons.openapi,
    href: "/rest-api",
  },
]

const aiItems: K8sItem[] = [
  {
    key: "ml",
    title: "Machine Learning",
    blurb: "Models learn patterns from labeled data.",
    details: "Classical ML covers regression, classification, and forecasting with engineered features.",
    snippet: "python train.py --model random_forest --dataset data.csv",
    icon: aiIcons.ml,
  },
  {
    key: "dl",
    title: "Deep Learning",
    blurb: "Neural networks discover hierarchical representations.",
    details: "Deep nets power perception tasks, sequence models, and generative systems at scale.",
    snippet: "pip install torch torchvision\npython scripts/train_cnn.py",
    icon: aiIcons.dl,
  },
  {
    key: "nlp",
    title: "Natural Language",
    blurb: "Techniques for understanding and generating text.",
    details: "Tokenization, embeddings, transformers, and large language models enable rich language apps.",
    snippet: "pip install transformers\npython summarise.py --model facebook/bart-large-cnn",
    icon: aiIcons.nlp,
  },
  {
    key: "cv",
    title: "Computer Vision",
    blurb: "Extracts insights from images and video.",
    details: "Vision models classify, detect objects, segment scenes, and power AR/VR experiences.",
    snippet: "python detect.py --weights yolov8n.pt --source images/",
    icon: aiIcons.cv,
  },
  {
    key: "pipeline",
    title: "Data Pipeline",
    blurb: "Moves and transforms data for training.",
    details: "ETL pipelines ensure data quality, versioning, and reproducible datasets.",
    snippet: "dbt run --select staging+\nprefect deployment create pipeline.py",
    icon: aiIcons.pipeline,
  },
  {
    key: "mlops",
    title: "MLOps",
    blurb: "Operationalizes ML with CI/CD and monitoring.",
    details: "Model registry, automated retraining, and observability keep ML systems healthy.",
    snippet: "mlflow models serve -m models:/demo-model/Production -p 5001",
    icon: aiIcons.mlops,
  },
]

export type Topic = {
  id: "kubernetes" | "docker" | "ai" | "rest"
  label: string
  summary: string
  heroTitle: string
  heroDescription: string
  items: K8sItem[]
  accent: "brand" | "sky" | "violet" | "teal"
  tileIcon: string
  showGraph?: boolean
}

export const topics: Topic[] = [
  {
    id: "docker",
    label: "Docker",
    summary: "Containers, images, networking, and local orchestration.",
    heroTitle: "Docker",
    heroDescription: "Explore core building blocks that ship software consistently from laptop to cloud.",
    items: dockerItems,
    accent: "sky",
    tileIcon: dockerLogo,
  },
  {
    id: "kubernetes",
    label: "Kubernetes",
    summary: "Clusters, workloads, and control plane internals.",
    heroTitle: "Kubernetes",
    heroDescription: "Orchestrate containers reliably across any environment with automated scaling, healing, and service discovery.",
    items: k8sItems,
    accent: "brand",
    tileIcon: kubernetesLogo,
    showGraph: true,
  },
  {
    id: "rest",
    label: "RESTful APIs",
    summary: "Design principles for predictable web services.",
    heroTitle: "RESTful API Patterns",
    heroDescription: "Model resources, version safely, and craft intuitive endpoints your consumers will love.",
    items: restApiItems,
    accent: "teal",
    tileIcon: restIcons.logo,
  },
  {
    id: "ai",
    label: "Applied AI",
    summary: "Model development, pipelines, and production operations.",
    heroTitle: "Applied AI",
    heroDescription: "Survey the modern ML stack from prototyping models to reliable production systems.",
    items: aiItems,
    accent: "violet",
    tileIcon: aiLogo,
  },
]

export type Accent = Topic["accent"]

export const dockerConcepts = dockerItems
export const restConcepts = restApiItems
