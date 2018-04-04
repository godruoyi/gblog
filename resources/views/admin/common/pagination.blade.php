<div class="row">
    <div class="col-sm-5">
        <div class="dataTables_info" id="dataTable_info">显示第 {{ $data->firstItem() }} 至 {{ $data->lastItem() }} 项结果，共 {{ $data->total() }} 项</div>
    </div>
    <div class="col-sm-7 pull-right">{{ $data->links() }}</div>
</div>
