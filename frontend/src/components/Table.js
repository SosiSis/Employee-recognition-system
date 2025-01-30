import React from 'react'
import './Table.css'
function Table() {
  return (
    <div  className='table-container'>
     <div className='table'>
     <div  className='row '><span>1</span> <span>2</span> <span>3</span> <span>4</span> <span>5</span> <span>6</span></div>
        <div className='row background'><span>1</span> <span>2</span> <span>3</span> <span>4</span> <span>5</span> <span>6</span></div>
        <div  className='row '><span>1</span> <span>2</span> <span>3</span> <span>4</span> <span>5</span> <span>6</span></div>
        <div  className='row background'><span>1</span> <span>2</span> <span>3</span> <span>4</span> <span>5</span> <span>6</span></div>
        <div  className='row '><span>1</span> <span>2</span> <span>3</span> <span>4</span> <span>5</span> <span>6</span></div>
        <div  className='row background'><span>1</span> <span>2</span> <span>3</span> <span>4</span> <span>5</span> <span>6</span></div>
        <div className='pagination'><p>previous</p> <div>1</div><div>2</div><div>3</div><p>Next</p></div>
     </div>


    </div>
    
  )
}

export default Table