import './component.css';

export default function Board ({twoDimArray, handleClick}) {
    let colors =  ['black', 'white', 'blue'];
    return <div className="board">
        {
            twoDimArray.map((oneDArray, row) => {

                return (
                    <div key={'box_'+row}>

                        {
                            oneDArray.map((value, column)=>{                                
                                // console.log(`key=${'box_'+row+"_"+column}`);
                                return <div 
                                        className="box"
                                        id={'box_'+row+"_"+column}
                                        key={'box_'+row+"_"+column}
                                        onClick={handleClick}
                                        style={{
                                            backgroundColor: colors[value]
                                        }}
                                    >
                                        {/* {value} */}
                                    </div>
                            })
                        }
                    </div>
                );

            })

        }
    </div>
}